import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB86Gut7m2jTPlgOAnsB-URXIy_RTjv_ig",
  authDomain: "vocabulearning-c6b24.firebaseapp.com",
  databaseURL: "https://vocabulearning-c6b24-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vocabulearning-c6b24",
  storageBucket: "vocabulearning-c6b24.appspot.com",
  messagingSenderId: "752274796927",
  appId: "1:752274796927:web:2a6a8371e0fddac3432a4a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
