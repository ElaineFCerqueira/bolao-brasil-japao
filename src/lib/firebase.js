// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP0SERdeuTpc08GBP0MuujFkgQqGG36ts",
  authDomain: "bolao-brasil-japao.firebaseapp.com",
  projectId: "bolao-brasil-japao",
  storageBucket: "bolao-brasil-japao.firebasestorage.app",
  messagingSenderId: "649514126116",
  appId: "1:649514126116:web:b7eee7e701f585646e01b1",
  measurementId: "G-QS7PL122CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
