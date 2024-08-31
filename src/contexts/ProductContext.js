import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllProducts(productList);
    };

    getAllProducts();
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
