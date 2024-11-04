import firebaseApp from "./config";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Initialize Auth
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };