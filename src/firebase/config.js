
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA3LS8xuraKqoEMK4XwJJvKYYIt_5xrE5g",
    authDomain: "miniblog-2184e.firebaseapp.com",
    projectId: "miniblog-2184e",
    storageBucket: "miniblog-2184e.firebasestorage.app",
    messagingSenderId: "543467109011",
    appId: "1:543467109011:web:f95d0192f8363b735aab66"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db, app }