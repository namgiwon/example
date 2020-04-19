import firebase from "firebase";
import { store } from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyCzQ-x5XoYZDOVRKmIWILZ0gWpzA0P7Lqo",
  authDomain: "thankyoureward-b4189.firebaseapp.com",
  databaseURL: "https://thankyoureward-b4189.firebaseio.com",
  projectId: "thankyoureward-b4189",
  storageBucket: "thankyoureward-b4189.appspot.com",
  messagingSenderId: "837334228689",
  appId: "1:837334228689:web:aaa2b28bdfef0c17d9aff0",
  measurementId: "G-KS0GBP0E1K"
};

// Initialize Firebase
export const myFirebase = firebase.initializeApp(firebaseConfig);

myFirebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    myFirebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification();
        } else {
          myFirebase
            .auth()
            .currentUser.getIdToken(/* forceRefresh */ false)
            .then(function(idToken) {
              store.commit("setFirebaseToken", idToken);
              store.commit("validate");
            });
        }
      }
    });
  });
