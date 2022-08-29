import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log(import.meta.env.VITE_DB_URL);

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvrfnx8blDkRhoT6U_kCPy7oSY4e5Z8nU",
    authDomain: "react-http-35c35.firebaseapp.com",
    databaseURL: import.meta.env.VITE_DB_URL,
    projectId: "react-http-35c35",
    storageBucket: "react-http-35c35.appspot.com",
    messagingSenderId: "26798392281",
    appId: "1:26798392281:web:e973ab7bbd97eca8774fc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
        "6LfRkOUgAAAAAAEOaR7bLwBdhW9TflI6h0kp3MvX"
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
});

console.log(appCheck);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
