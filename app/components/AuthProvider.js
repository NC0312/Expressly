'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset as firebaseConfirmPasswordReset
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    return userCredential;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  const confirmPasswordReset = async (oobCode, newPassword) => {
    await firebaseConfirmPasswordReset(auth, oobCode, newPassword);
  };

  const value = {
    user,
    signup,
    login,
    logout,
    resetPassword,
    confirmPasswordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

