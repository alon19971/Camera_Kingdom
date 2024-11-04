import firebaseApp from "./config";
import { getFirestore, collection } from "firebase/firestore";


// Initialize Firestore
const db = getFirestore(firebaseApp);

<<<<<<< HEAD
// Create collection reference
const colRef = collection(db, "products");

export { db, colRef };
=======
// Create collection references
const productsRef = collection(db, "products");
const usersRef = collection(db, "users");
const ordersRef = collection(db, "orders");

export { db, productsRef, usersRef, ordersRef };
>>>>>>> 893f93c (Added new sorting and search features for category pages)
