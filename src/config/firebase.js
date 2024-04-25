import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbKMDAHxQFfB6rJp0fXgtZQS5qyaWBVfE",
  authDomain: "web2spgeografiskhave.firebaseapp.com",
  projectId: "web2spgeografiskhave",
  storageBucket: "web2spgeografiskhave.appspot.com",
  messagingSenderId: "588389432367",
  appId: "1:588389432367:web:5320466aa7ee068d5a5ada"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);