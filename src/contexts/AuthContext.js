import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase/auth";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  updateEmail 
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isManager, setIsManager] = useState(false); // Add a state for manager check

  useEffect(() => {
    const removeAuthListener = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email === "alonaizin123@gmail.com") {
        setIsManager(true); // Mark user as manager
      } else {
        setIsManager(false); // Not a manager
      }
    });

    return () => removeAuthListener();
  }, []);

  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  const register = async (name, email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredentials.user, { displayName: name });
    return userCredentials;
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const update = async (user, { displayName, email, photoURL }) => {
    if (displayName || photoURL) {
      await updateProfile(user, { displayName, photoURL });
    }

    if (email) {
      await updateEmail(user, email);
    }
  };

  const globalVal = {
    currentUser,
    isManager, // Provide manager flag globally
    login,
    googleLogin,
    register,
    logout,
    update,
  };

  return (
    <AuthContext.Provider value={globalVal}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
