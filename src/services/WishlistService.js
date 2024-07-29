// src/services/WishlistService.js
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

const addToWishlist = async (userId, productId) => {
  const wishlistRef = collection(db, 'wishlist');
  await addDoc(wishlistRef, {
    userId,
    productId,
  });
};

const getWishlist = async (userId) => {
  const wishlistRef = collection(db, 'wishlist');
  const q = query(wishlistRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  const wishlist = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return wishlist;
};

const removeFromWishlist = async (wishlistId) => {
  const wishlistDoc = doc(db, 'wishlist', wishlistId);
  await deleteDoc(wishlistDoc);
};

export { addToWishlist, getWishlist, removeFromWishlist };
