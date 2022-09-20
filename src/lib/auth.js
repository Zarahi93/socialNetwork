import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

import { app } from './config.js';

const auth = getAuth(app);

export const addUser = (userEmail, userPassword) =>
  createUserWithEmailAndPassword(auth, userEmail, userPassword);

