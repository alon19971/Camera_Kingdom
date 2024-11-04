import React, { createContext, useContext, useState, useEffect } from "react";
<<<<<<< HEAD
import { db } from "../firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
=======
import { productsRef } from "../firebase/firestore";
import { doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
>>>>>>> 893f93c (Added new sorting and search features for category pages)

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
<<<<<<< HEAD
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    // Use onSnapshot to listen for real-time updates from the products collection
    const productsRef = collection(db, "products");
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllProducts(productList);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const getProduct = (id) => {
    return allProducts.find((product) => product.id === id);
  };

  const getRelatedProducts = (category) => {
    return allProducts.filter((product) => product.category === category);
  };

  return (
    <ProductContext.Provider value={{ allProducts, getProduct, getRelatedProducts }}>
=======
  const [productsLoading, setProductsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  // const [selectedProductLoading, setSelectedProductLoading] = useState(true);
  // const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      setProductsLoading(true);

      const prductsCollection = await getDocs(productsRef);
      const sortedProducts = prductsCollection.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => {
          const brandComparison = a.brand.localeCompare(b.brand);
          if (brandComparison !== 0) {
            return brandComparison;
          }
          return a.model.localeCompare(b.model);
        });

      setAllProducts(sortedProducts);
      setProductsLoading(false);
    };

    getAllProducts();
  }, []);

  // Get a product document reference (for document changes)
  const getProductDocRef = (id) => {
    const productRef = doc(productsRef, id);

    return productRef;
  };

  const getProduct = (id) => {
    // const productRef = getProductDocRef(id);

    // return getDoc(productRef)
    //   .then((doc) => {
    //     if (doc.exists()) {
    //       const productData = { id: doc.id, ...doc.data() };
    //       return productData;
    //     } else {
    //       console.error("Product document not found");
    //       return null;
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching product document:", error);
    //     return null;
    //   });
    const product = allProducts.find((product) => product.id === id) || null;

    return product;
  };

  const addReview = (productId, newReview) => {
    // Validate the review input and return an error if empty
    if (!newReview || newReview.message.trim() === "") {
      return Promise.reject(new Error("Cannot submit an empty review"));
    }

    // Create updated products list by adding the review to the correct product
    const updatedProducts = allProducts.map((product) =>
      product.id === productId
        ? {
            ...product,
            reviews: [...product.reviews, newReview],
          }
        : product
    );

    // Get the updated product
    const updatedProduct = updatedProducts.find(
      (product) => product.id === productId
    );

    const productRef = getProductDocRef(productId);

    return updateDoc(productRef, {
      reviews: updatedProduct.reviews,
    })
      .then(() => {
        setAllProducts(updatedProducts);
      })
      .catch((error) => {
        console.log("Error adding review: ", error);
        return Promise.reject(
          new Error(
            "Failed to add your review. Please try again or contact support"
          )
        );
      });
  };

  const removeReview = (productId, reviewIndex) => {
    const productRef = getProductDocRef(productId);

    // Create updated products list by removing the review at the given index
    const updatedProducts = allProducts.map((product) =>
      product.id === productId
        ? {
            ...product,
            reviews: product.reviews.filter(
              (_, index) => index !== reviewIndex
            ),
          }
        : product
    );

    // Get the updated product
    const updatedProduct = updatedProducts.find(
      (product) => product.id === productId
    );

    // Update the product's reviews in Firestore
    return updateDoc(productRef, {
      reviews: updatedProduct.reviews,
    })
      .then(() => {
        // Update the local products only if the Firestore update succeeds
        setAllProducts(updatedProducts);
      })
      .catch((error) => {
        console.log("Error removing review: ", error);
        return Promise.reject(
          new Error(
            "Failed to remove your review. Please try again or contact support"
          )
        );
      });
  };

  const getFeaturedProducts = () => {
    const featuredProducts = [];
    const usedIndexes = [];

    // Generate random indexes until we have 5 unique items or run out of products
    while (
      featuredProducts.length < 5 &&
      featuredProducts.length < allProducts.length
    ) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);

      // Check if this index was already used
      if (!usedIndexes.includes(randomIndex)) {
        usedIndexes.push(randomIndex);
        featuredProducts.push(allProducts[randomIndex]);
      }
    }

    // Return the array of featured products
    return featuredProducts;
  };

  const getRelatedProducts = (product) => {
    const relatedProducts = [];
    const usedIndexes = [];

    // Generate random indexes until we have 10 unique items or run out of products
    while (
      relatedProducts.length < 10 &&
      relatedProducts.length < allProducts.length
    ) {
      const randomIndex = Math.floor(Math.random() * allProducts.length);

      // Check if this index was already used
      if (!usedIndexes.includes(randomIndex)) {
        usedIndexes.push(randomIndex);

        const currentProduct = allProducts[randomIndex];

        if (
          currentProduct.type === product.type ||
          currentProduct.brand === product.brand
        ) {
          relatedProducts.push(allProducts[randomIndex]);
        }
      }

      // If all products were iterated over - stop generating
      // (There can be less than 10 related products)
      if (usedIndexes.length === allProducts.length) {
        break;
      }
    }

    return relatedProducts;
  };

  const globalVal = {
    productsLoading,
    // selectedProductLoading,
    allProducts,
    // selectedProduct,
    getProduct,
    getProductDocRef,
    addReview,
    removeReview,
    getRelatedProducts,
    getFeaturedProducts,
  };

  return (
    <ProductContext.Provider value={globalVal}>
>>>>>>> 893f93c (Added new sorting and search features for category pages)
      {children}
    </ProductContext.Provider>
  );
};

<<<<<<< HEAD
export const useProductContext = () => useContext(ProductContext);
=======
export const useProductContext = () => {
  return useContext(ProductContext);
};
>>>>>>> 893f93c (Added new sorting and search features for category pages)
