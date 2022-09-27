import { signInWithPopup, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { onNavigate } from '../main.js';
import { auth, signInUser, googleProvider } from '../lib/auth.js';

export const login = () => {
  // section main of login padre
  const mainLogin = document.createElement('main');
  mainLogin.setAttribute('class', 'main');
  const sectionLogin = document.createElement('section');
  sectionLogin.setAttribute('class', 'section_login_register');
  // add the buttons of login or register este lo cambio a mi nodo padre?
  const divloginButtons = document.createElement('div');
  divloginButtons.setAttribute('class', 'register-buttons-div');
  const sectionInputs = document.createElement('section');
  sectionInputs.setAttribute('class', 'section_inputs');
  const sectionLinesHr = document.createElement('section');
  sectionLinesHr.setAttribute('class', 'section-lines-hr');

  const animalPawnet = document.createElement('h2');
  animalPawnet.setAttribute('class', 'animal-pawnet');
  animalPawnet.textContent = 'Animal Pawnet';
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('id', 'inputEmail');
  inputEmail.setAttribute('class', 'inputs');
  const textEmail = document.createElement('p');
  textEmail.setAttribute('class', 'p');
  textEmail.textContent = 'Email';
  const inputPassWord = document.createElement('input');
  inputPassWord.setAttribute('class', 'inputs');
  inputPassWord.setAttribute('id', 'inputPassword');
  inputPassWord.setAttribute('type', 'password');
  const textPassword = document.createElement('p');
  textPassword.setAttribute('class', 'p');
  textPassword.textContent = 'Contraseña';

  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('id', 'log-in');
  buttonLogin.setAttribute('class', 'login-button');
  buttonLogin.textContent = 'Inicia sesión';

  const hrLeft = document.createElement('hr');
  hrLeft.setAttribute('class', 'hr-sec-log');
  const leterSec = document.createElement('p');

  leterSec.setAttribute('class', 'p');
  leterSec.textContent = 'ó';
  const hrRight = document.createElement('hr');
  hrRight.setAttribute('class', 'hr-sec-log');

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrate';
  buttonRegister.setAttribute('id', 'register');
  buttonRegister.setAttribute('class', 'go-register-button');

  const googleButton = document.createElement('button');
  googleButton.setAttribute('class', 'googleLogin');

  const textRegister = document.createElement('p');
  textRegister.setAttribute('class', 'text-register');

  textRegister.textContent = '¿No tienes cuenta?';

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register'); // falta el archivo de registro
  });

  const loginError = document.createElement('p');
  loginError.setAttribute('class', 'error');

  buttonLogin.addEventListener('click', () => {
    const email = inputEmail.value;
    const password = inputPassWord.value;
    signInUser(email, password)
      .then((userCredential) => {
        onNavigate('/timeline');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        loginError.innerHTML = 'Email o contraseña no válido';
      });
  });
  const googleButton = document.createElement('button');
  googleButton.setAttribute('class', 'google-login');


  googleButton.addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        onNavigate('/timeline');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const userEmail = user.email;
      // ...
      console.log(uid, userEmail);
    } else {
      // User is signed out
      // ...
      console.log('No tas conectao');
    }
  });
  // appends the inputs to main
  sectionInputs.append(inputEmail, textEmail, inputPassWord, textPassword, loginError, buttonLogin);
  // appends the section lines
  sectionLinesHr.append(hrLeft, leterSec, hrRight);
  // appends the buttons to the main tag
  divloginButtons.append(googleButton, textRegister, buttonRegister);

  sectionLogin.append(sectionInputs, sectionLinesHr, divloginButtons);

  mainLogin.append(animalPawnet, sectionLogin);

  return mainLogin;
};
