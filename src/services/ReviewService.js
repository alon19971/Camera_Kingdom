// src/services/ReviewService.js
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const addReview = async (productId, userId, rating, comment) => {
  const reviewsRef = collection(db, 'reviews');
  await addDoc(reviewsRef, {
    productId,
    userId,
    rating,
    comment,
    date: new Date(),
  });
};

const getReviews = async (productId) => {
  const reviewsRef = collection(db, 'reviews');
  const q = query(reviewsRef, where('productId', '==', productId));
  const snapshot = await getDocs(q);
  const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return reviews;
};

export { addReview, getReviews };
