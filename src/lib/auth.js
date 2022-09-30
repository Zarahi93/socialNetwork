import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

import { app } from './config.js';

export const auth = getAuth(app);

// eslint-disable-next-line max-len
export const addUser = (userEmail, userPassword) => createUserWithEmailAndPassword(auth, userEmail, userPassword);

export const googleProvider = new GoogleAuthProvider();

export const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

/* rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2022, 10, 22);
    }
  }
}
*/
