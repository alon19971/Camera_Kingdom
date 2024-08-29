import firebaseApp from "./config";
import { getFirestore, collection } from "firebase/firestore";


// Initialize Firestore
const db = getFirestore(firebaseApp);

// Create collection reference
const colRef = collection(db, "products");

export { db, colRef };