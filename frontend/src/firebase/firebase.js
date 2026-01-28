import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBIitZnx1wSLEaK6_82tP-pK3ungiuLbzc",
    authDomain: "theeyasakthi-backend.firebaseapp.com",
    projectId: "theeyasakthi-backend",
    storageBucket: "theeyasakthi-backend.firebasestorage.app",
    messagingSenderId: "991195994610",
    appId: "1:991195994610:web:0f48e433ac477ccd6e736b",
    measurementId: "G-XPJN206BP1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
