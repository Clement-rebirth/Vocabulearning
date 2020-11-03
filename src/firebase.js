import firebase from 'firebase/app';
import 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdW4qD5kwQ4K_n9mb79azzyHcvH0FaraQ",
  authDomain: "vocabulearning.firebaseapp.com",
  databaseURL: "https://vocabulearning.firebaseio.com",
  projectId: "vocabulearning",
  storageBucket: "vocabulearning.appspot.com",
  messagingSenderId: "479135033103",
  appId: "1:479135033103:web:721f44e82b7477d9f1007a",
  measurementId: "G-ZBBM8XV56C"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp;
