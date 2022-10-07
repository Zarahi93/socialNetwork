// eslint-disable-next-line import/no-unresolved
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js';

import { app } from './config.js';

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// export const saveEmail = (userEmail) => addDoc(collection(db, 'emails'), { userEmail });
export const savePost = (userEmail, userPost, likes) =>
  addDoc(collection(db, 'posts'), { userEmail, userPost, likes });

export const getPosts = () => getDocs(collection(db, 'posts'));
/*dataBaseListener detecta que hubo cambios  en la base de datos y ejecuta funcion callback, onSnapshot solo detecta, no hace nada el callback lo hace*/
export const dataBaseListener = (callback) =>
  onSnapshot(collection(db, 'posts'), callback);

export const docRef = (db, posts, id) => {
  doc(db, posts, id); //devuelve una referencia del post
};

export const getPost = (id) => getDoc(doc(db, 'posts', id));// Pra poder obtener un post en especifico

export const updatePost = (id, newFields) => { 
  console.log(id);
  console.log(newFields);
  updateDoc(doc(db, 'posts', id), newFields)};

export const updateLike = (docRef, likeproperty) =>
  updateDoc(docRef, likeproperty);
