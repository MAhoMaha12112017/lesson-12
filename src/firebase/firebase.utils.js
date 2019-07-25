import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyChifsITQHhvsBinmM5_ZEek9NZcUNlz_Q",
  authDomain: "crwn-db-e417c.firebaseapp.com",
  databaseURL: "https://crwn-db-e417c.firebaseio.com",
  projectId: "crwn-db-e417c",
  storageBucket: "crwn-db-e417c.appspot.com",
  messagingSenderId: "977787624418",
  appId: "1:977787624418:web:4811fbe34dc0c1b2"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
