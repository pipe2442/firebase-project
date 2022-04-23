import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlefVqBo_G8CgSVOkSr9hVi0t3rEaUmvQ",
  authDomain: "react-web-1-9fffe.firebaseapp.com",
  projectId: "react-web-1-9fffe",
  storageBucket: "react-web-1-9fffe.appspot.com",
  messagingSenderId: "543723108023",
  appId: "1:543723108023:web:d6c9708acbeed029827f32",
  measurementId: "G-1PPCQCCCTG",
};

firebase.initializeApp(firebaseConfig);
export { firebase };
