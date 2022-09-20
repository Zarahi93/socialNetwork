import { onNavigate } from '../main.js';

import { addUser } from '../lib/auth.js';

export const register = () => {
  const mainRegister = document.createElement('main');
  mainRegister.setAttribute('class', 'mainRegister');
  const sectionInput = document.createElement('section');
  sectionInput.setAttribute('class', 'sectionInput');
  const sectionLine = document.createElement('section');
  sectionLine.setAttribute('class', 'sectionLine');
  const sectionAll = document.createElement('section');
  sectionAll.setAttribute('class', 'sectionRegister');

  const registerButton = document.createElement('button');
  registerButton.setAttribute('class', 'registerButton');
  const googleButton = document.createElement('button');
  googleButton.setAttribute('class', 'googleButton');

  const title = document.createElement('h2');
  title.setAttribute('class', 'title');
  const email = document.createElement('input');
  email.setAttribute('class', 'inputRegister');
  const emailOne = document.createElement('p');
  emailOne.setAttribute('class', 'p');
  const pass = document.createElement('input');
  pass.setAttribute('class', 'inputRegister');
  pass.setAttribute('type', 'password');
  const passOne = document.createElement('p');
  passOne.setAttribute('class', 'p');
  const hrOne = document.createElement('hr');
  hrOne.setAttribute('class', 'hr');
  const leter = document.createElement('p');
  leter.setAttribute('class', 'p');
  leter.setAttribute('id', 'leter');
  const hrTwo = document.createElement('hr');
  hrTwo.setAttribute('class', 'hr');

  title.textContent = 'Animal Pawnet';
  registerButton.textContent = 'Registrate';
  googleButton.textContent = 'continuar con Google';
  emailOne.textContent = 'Email';
  passOne.textContent = 'Contraseña';
  leter.textContent = 'ó';

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
      });
  });

  googleButton.addEventListener('click', () => {});

  sectionInput.append(email, emailOne, pass, passOne);
  sectionLine.append(hrOne, leter, hrTwo);
  sectionAll.append(sectionInput, registerButton, sectionLine, googleButton);
  mainRegister.append(title, sectionAll);
  return mainRegister;
};
