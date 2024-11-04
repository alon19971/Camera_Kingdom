import firebaseApp from "./config";
import { getFirestore, collection } from "firebase/firestore";


// Initialize Firestore
const db = getFirestore(firebaseApp);

// Create collection references
const productsRef = collection(db, "products");
const usersRef = collection(db, "users");
const ordersRef = collection(db, "orders");

export { db, productsRef, usersRef, ordersRef };