import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      const sortedProducts = snapshot.docs
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
    };

    getAllProducts();
  }, []);

  // Rename to getProductById
  const getProductById = async (id) => {
    const productRef = doc(db, "products", id);
    const productDoc = await getDoc(productRef);
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() };
    } else {
      throw new Error("Product not found");
    }
  };

  const getRelatedProducts = (category) =>
    allProducts.filter((product) => product.category === category);

  const globalVal = {
    allProducts,
    getProductById,  // Updated name
    getRelatedProducts,
  };

  return (
    <ProductContext.Provider value={globalVal}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
