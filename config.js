import * as firebase from 'firebase'
import firestore from 'firebase/firestore'
import auth from 'firebase/auth'
import firebaseConfig from './firebaseConfig';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
firebase.auth();
firebase.firestore();

export const db = firebase.firestore();

export default firebase;