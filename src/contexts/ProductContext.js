import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
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
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
