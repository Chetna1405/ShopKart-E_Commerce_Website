import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "shopkart-e-comm.firebaseapp.com",
    projectId: "shopkart-e-comm",
    storageBucket: "shopkart-e-comm.firebasestorage.app",
    messagingSenderId: "590469531181",
    appId: "1:590469531181:web:19b17e75ade17137f55aa4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export { auth, provider };