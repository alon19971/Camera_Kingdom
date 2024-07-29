// src/services/ProductService.js
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const productCollection = collection(db, 'products');

const getProducts = async () => {
  try {
    const snapshot = await getDocs(productCollection);
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return products;
  } catch (error) {
    console.error('Error getting products: ', error);
    return [];
  }
};

export { getProducts };
