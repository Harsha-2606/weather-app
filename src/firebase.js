import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPP57ZV9Gl7p32ORNpyQ4WCZtPoSwulok",
  authDomain: "weather-app-4ee68.firebaseapp.com",
  projectId: "weather-app-4ee68",
  storageBucket: "weather-app-4ee68.firebasestorage.app",
  messagingSenderId: "414902687971",
  appId: "1:414902687971:web:ff276a1c4a28cafd638dd6",
  measurementId: "G-9MGLPK6PZF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup};