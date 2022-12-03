import { initializeApp } from "firebase/app";
import  {getAuth} from 'firebase/auth';
import {getFirestore, doc} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAwSSpDck73LQmIZT6gKaJjVNNXcpjr2Iw",
  authDomain: "marvel-quiz-c1ef8.firebaseapp.com",
  projectId: "marvel-quiz-c1ef8",
  storageBucket: "marvel-quiz-c1ef8.appspot.com",
  messagingSenderId: "967403515427",
  appId: "1:967403515427:web:66952becb973bed0df0b96"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore();
export const user = uid => doc(firestore,`users/${uid}`);

export const auth = getAuth(app);
export default firebaseConfig;