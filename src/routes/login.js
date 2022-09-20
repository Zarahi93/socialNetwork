import { onNavigate } from '../main.js';

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
  inputEmail.setAttribute('class', 'inputs');
  const email = document.createElement('p');
  email.textContent = 'Email';
  const inputPassWord = document.createElement('input');
  inputPassWord.setAttribute('class', 'inputs');
  const pasword = document.createElement('p');
  pasword.textContent = 'Pasword';

  const buttonLogin = document.createElement('button');
  buttonLogin.setAttribute('id', 'log-in');
  buttonLogin.setAttribute('class', 'login-button');
  buttonLogin.textContent = 'Inicia sesión';

  const hrLeft = document.createElement('hr');
  hrLeft.setAttribute('class', 'hrSecLog');
  const leterSec = document.createElement('p');
  leterSec.setAttribute('class', 'pLetSec');
  leterSec.textContent = 'O'; // no aparece aiudaaa
  const hrRight = document.createElement('hr');
  hrRight.setAttribute('class', 'hrSecLog');

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'Registrate';
  buttonRegister.setAttribute('id', 'register');
  buttonRegister.setAttribute('class', 'register-button');

  const textRegister = document.createElement('p');
  textRegister.setAttribute('class', 'textRegister');
  textRegister.textContent = '¿No tienes cuenta?';

  buttonRegister.addEventListener('click', () => {
    onNavigate('/register'); // falta el archivo de registro
  });
  buttonLogin.addEventListener('click', () => {
    return onNavigate('/timeline');
  });
  // appends the inputs to main
  sectionInputs.append(animalPawnet, inputEmail, email, inputPassWord, pasword);
  // appends the section lines
  sectionLinesHr.append(hrLeft, leterSec, hrRight);
  // appends the buttons to the main tag
  divloginButtons.append(buttonLogin, buttonRegister, textRegister);

  sectionLogin.append(sectionInputs, sectionLinesHr, divloginButtons);

  mainLogin.append(sectionLogin);

  return mainLogin;
};
