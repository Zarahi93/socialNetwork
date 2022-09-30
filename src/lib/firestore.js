// eslint-disable-next-line import/no-unresolved
import {
  getFirestore, collection, addDoc, getDocs, onSnapshot
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';
import { app } from './config.js';

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// export const saveEmail = (userEmail) => addDoc(collection(db, 'emails'), { userEmail });
export const savePost = (userEmail, userPost) => addDoc(collection(db, 'posts'), { userEmail, userPost });

export const getPosts = () => getDocs(collection(db, 'posts'));

export const onGetPosts = (callback) => onSnapshot(collection(db, 'posts'), callback);
