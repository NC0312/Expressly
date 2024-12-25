// firebase/utils.js
'use client';

import { db } from './config';
import { 
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export const createUserDocument = async (userId, userData) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  };

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const checkUsernameAvailability = async (username) => {
  try {
    const q = query(collection(db, 'users'), where('userName', '==', username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error;
  }
};