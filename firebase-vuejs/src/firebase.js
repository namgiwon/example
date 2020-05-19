import firebase from "firebase";
import { store } from "./store";

const firebaseConfig = {
  
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
