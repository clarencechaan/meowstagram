import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let config = {
  apiKey: "AIzaSyAXRrmM2WH7nmlAu96WfUfQqxmIV4xKQEY",
  authDomain: "catstagram-893e9.firebaseapp.com",
  projectId: "catstagram-893e9",
  storageBucket: "catstagram-893e9.appspot.com",
  messagingSenderId: "227257513421",
  appId: "1:227257513421:web:add2f0ed1eb36c63f28084",
  measurementId: "G-G6LZVDHTFY",
};

const app = initializeApp(config);
const db = getFirestore(app);

export { db, app };
