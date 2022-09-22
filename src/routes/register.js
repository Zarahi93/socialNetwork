import { onNavigate } from '../main.js';
import { signInWithPopup } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js';
import { addUser, auth, googleProvider } from '../lib/auth.js';

export const register = () => {
  const mainRegister = document.createElement('main');
  mainRegister.setAttribute('class', 'main');
  const title = document.createElement('h2');
  title.setAttribute('class', 'animalPawnet');
  const sectionAll = document.createElement('section');
  sectionAll.setAttribute('class', 'section_login_register');
  const sectionInput = document.createElement('section');
  sectionInput.setAttribute('class', 'sectionInput');
  const email = document.createElement('input');
  email.setAttribute('class', 'inputRegister');
  const emailOne = document.createElement('p');
  emailOne.setAttribute('class', 'p');
  const pass = document.createElement('input');
  pass.setAttribute('class', 'inputRegister');
  pass.setAttribute('type', 'password');
  const passOne = document.createElement('p');
  passOne.setAttribute('class', 'p');
  const pMessage = document.createElement('p');
  pMessage.setAttribute('class', 'error');
  const registerButton = document.createElement('button');
  registerButton.setAttribute('class', 'registerButton');


  title.textContent = 'Animal Pawnet';
  registerButton.textContent = 'Registrate';
  emailOne.textContent = 'Email';
  passOne.textContent = 'Contraseña';

  registerButton.addEventListener('click', () => {
    const userEmail = email.value;
    const userPassword = pass.value;
    addUser(userEmail, userPassword)
      .then((userCredential) => {
        onNavigate('/timeline');
      })
      .catch((error) => {
        const errorCode = error.code; // auth/invalid-email
        const errorMessage = error.message; // Firebase: Error (auth/invalid-email)
        pMessage.innerHTML = 'Email o contraseña no válido';
      });
  });

  sectionInput.append(email, emailOne, pass, passOne, pMessage);
  sectionAll.append(sectionInput, registerButton);
  mainRegister.append(title, sectionAll);
  return mainRegister;
};
