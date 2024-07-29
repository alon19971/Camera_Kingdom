// src/services/RecommendationService.js
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const getRecommendedProducts = async () => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, orderBy('popularity', 'desc'), limit(5));
  const snapshot = await getDocs(q);
  const recommendedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return recommendedProducts;
};

export { getRecommendedProducts };
