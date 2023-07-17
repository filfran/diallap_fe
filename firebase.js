// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5A9BGycUiCHreDqbdByaje7vm-CBYEHQ",
  authDomain: "diallapp-demo.firebaseapp.com",
  projectId: "diallapp-demo",
  storageBucket: "diallapp-demo.appspot.com",
  messagingSenderId: "809872100511",
  appId: "1:809872100511:web:b7371c665e65e1fe42e6aa",
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
