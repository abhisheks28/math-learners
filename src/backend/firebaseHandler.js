import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { get, getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBFxFXixlq_U9LCl2vUPoSc0dlDwkz4P6Q",
//     authDomain: "learners-skill-conquest.firebaseapp.com",
//     databaseURL: "https://learners-skill-conquest-default-rtdb.firebaseio.com",
//     projectId: "learners-skill-conquest",
//     storageBucket: "learners-skill-conquest.firebasestorage.app",
//     messagingSenderId: "180104061262",
//     appId: "1:180104061262:web:a02a81f0397683f9affe1f",
//     measurementId: "G-5GSEVD791T"
// };


const firebaseConfig = {
    apiKey: "AIzaSyC1ezkyUJwjvmRNeCzd4wdmdtEwkC9Ufbs",
    authDomain: "learners-skill-conquest-7e4b5.firebaseapp.com",
    projectId: "learners-skill-conquest-7e4b5",
    storageBucket: "learners-skill-conquest-7e4b5.firebasestorage.app",
    messagingSenderId: "998541707180",
    appId: "1:998541707180:web:97b95b21289c5d9e3f1c09",
    measurementId: "G-VDBYCD6KYK"
};


const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
export const auth = getAuth(app);
