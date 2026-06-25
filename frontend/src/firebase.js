// src/firebase.js

import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlpzOZLb8bfXSID0E0nFXcK5dzEOhcn20",

  authDomain:
    "smart-rental-87b8f.firebaseapp.com",

  projectId:
    "smart-rental-87b8f",

  storageBucket:
    "smart-rental-87b8f.firebasestorage.app",

  messagingSenderId:
    "1081607195907",

  appId:
    "1:1081607195907:web:cd400edb89881139a5ad36",
};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();