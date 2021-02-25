import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-P9CRN2EFjdy9opROT54S9SuI9TwZQVU",
  authDomain: "workshiph.firebaseapp.com",
  projectId: "workshiph",
  storageBucket: "workshiph.appspot.com",
  messagingSenderId: "522246438378",
  appId: "1:522246438378:web:0d320b6969c24e69958693",
  measurementId: "G-2CM23VQWKV"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export default firebase;