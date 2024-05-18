import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4GZTvkXsx5sNk1rJ45z-8ObTUmBIaMYQ",
  authDomain: "work-schedule-fb5ca.firebaseapp.com",
  projectId: "work-schedule-fb5ca",
  storageBucket: "work-schedule-fb5ca.appspot.com",
  messagingSenderId: "412056562983",
  appId: "1:412056562983:web:baffd655f472c0d3348d02",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
