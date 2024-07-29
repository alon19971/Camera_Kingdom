// src/services/OrderService.js
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const getOrders = async (userId) => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return orders;
};

export { getOrders };
