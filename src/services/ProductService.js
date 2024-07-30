// src/services/ProductService.js
import { db } from '../firebase';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';

const getProducts = async () => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

const getProduct = async (id) => {
  const productRef = doc(db, 'products', id);
  const productDoc = await getDoc(productRef);
  if (productDoc.exists()) {
    return { id: productDoc.id, ...productDoc.data() };
  } else {
    throw new Error('Product not found');
  }
};

export { getProducts, getProduct };
