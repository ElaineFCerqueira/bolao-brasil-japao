import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCP0SERdeuTpc08GBP0MuujFkgQqGG36ts",
  authDomain: "bolao-brasil-japao.firebaseapp.com",
  projectId: "bolao-brasil-japao",
  storageBucket: "bolao-brasil-japao.firebasestorage.app",
  messagingSenderId: "649514126116",
  appId: "1:649514126116:web:b7eee7e701f585646e01b1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
