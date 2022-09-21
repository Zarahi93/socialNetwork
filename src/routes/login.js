import { onNavigate } from '../main.js';
//import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { auth, signInUser, googleProvider } from '../lib/auth.js';
import { signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';

export const login = () => {
  // section main of login padre
  const mainLogin = document.createElement('main');
  mainLogin.setAttribute('class', 'login-main');
  const sectionLogin = document.createElement('section');
  sectionLogin.setAttribute('class', 'section_login');
  // add the buttons of login or register este lo cambio a mi nodo padre?
  const divloginButtons = document.createElement('div');
  divloginButtons.setAttribute('class', 'register-buttons-div');
  const sectionInputs = document.createElement('section');
  sectionInputs.setAttribute('class', 'section_imputs');
  const sectionLinesHr = document.createElement('section');
  sectionLinesHr.setAttribute('class', 'sectionLinesHr');

  const animalPawnet = document.createElement('h2');
  animalPawnet.setAttribute('class', 'animalPawnet');
  animalPawnet.textContent = 'Animal Pawnet';
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('id', 'inputEmail');
  inputEmail.setAttribute('class', 'inputs');
  const textEmail = document.createElement('p');
  textEmail.textContent = 'Email';
  const inputPassWord = document.createElement('input');
  inputPassWord.setAttribute('class', 'inputs');
  inputPassWord.setAttribute('id', 'inputPassword');
  inputPassWord.setAttribute('type', 'password');
  const textPasword = document.createElement('p');
  textPasword.textContent = 'Contraseña';

  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('id', 'log-in');
  buttonLogin.setAttribute('class', 'login-button');
  buttonLogin.textContent = 'Inicia sesión';

  const hrLeft = document.createElement('hr');
  hrLeft.setAttribute('class', 'hrSecLog');
  const leterSec = document.createElement('p');
  leterSec.setAttribute('class', 'pLetSec');
  leterSec.textContent = 'ó';
  const hrRight = document.createElement('hr');
  hrRight.setAttribute('class', 'hrSecLog');

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrate';
  buttonRegister.setAttribute('id', 'register');
  buttonRegister.setAttribute('class', 'register-button');

  const googleButton = document.createElement('button');
  googleButton.setAttribute('class', 'googleLogin');

  const textRegister = document.createElement('p');
  textRegister.setAttribute('class', 'textRegister');
  textRegister.textContent = '¿No tienes cuenta?';

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register'); // falta el archivo de registro
  });

  const loginError = document.createElement('p');
  loginError.setAttribute('class', 'error');

  buttonLogin.addEventListener('click', () => {
    let email = inputEmail.value;
    let password = inputPassWord.value;
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

  // appends the inputs to main
  sectionInputs.append(inputEmail, textEmail, inputPassWord, textPasword, loginError, buttonLogin);
  // appends the section lines
  sectionLinesHr.append(hrLeft, leterSec, hrRight);
  // appends the buttons to the main tag
  divloginButtons.append(googleButton, textRegister, buttonRegister);

  sectionLogin.append(sectionInputs, sectionLinesHr, divloginButtons);

  mainLogin.append(animalPawnet, sectionLogin);

  return mainLogin;
};
