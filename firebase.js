import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  FIREBASE_APIKEY,
  FIREBASE_APPID,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PROJECTID,
  FIREBASE_STORAGEBUCKET,
  FIREBASE_MESSAGINGSENDERID,
} from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  projectId: FIREBASE_PROJECTID,
  storageBucket: FIREBASE_STORAGEBUCKET,
  messagingSenderId: FIREBASE_MESSAGINGSENDERID,
  appId: FIREBASE_APPID,
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
