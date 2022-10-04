import { getPosts } from '../lib/firestore.js';
import {
  fireBaseToJSObj,
  renderPosts,
  disableButton,
  createPost,
} from '../utils.js';

// Creating elements
export const timeLine = () => {
  // contenedor principal de los otros dos divs*/
  const timeLineMainContainer = document.createElement('section');
  const timeLineContainer = document.createElement('article');

  const postUserContainer = document.createElement('article');
  const inputWrapper = document.createElement('div');
  const inputText = document.createElement('textarea');
  inputText.setAttribute('minlength', '1');
  const postingButton = document.createElement('button');
  postingButton.setAttribute('disabled', '');
  const userPostPicture = document.createElement('img');

  const feed = document.createElement('div');
  // const userPost = document.createElement('div');

  const userNameContainer = document.createElement('div');
  const userName = document.createElement('h4');
  const userPicture = document.createElement('img');

  const contentPostContainer = document.createElement('div');
  const iconsContainer = document.createElement('div');

  const findHomeContainer = document.createElement('div');
  const adoptContainer = document.createElement('div');
  const userProfileContainer = document.createElement('div');
  const findHomeText = document.createElement('p');
  const adoptText = document.createElement('p');
  const userProfileText = document.createElement('p');
  findHomeContainer.classList.add('iconsNavBar');
  adoptContainer.classList.add('iconsNavBar');
  userProfileContainer.classList.add('iconsNavBar');

  const menuBarIconsContainer = document.createElement('div');

  /* adding classes */
  timeLineMainContainer.classList.add('timeLineMainContainer');
  timeLineContainer.classList.add('mainTimeline-Container');
  postUserContainer.classList.add('createPostTLContainer');
  inputWrapper.classList.add('inputWrapper');
  inputWrapper.setAttribute('id', 'input-Wrapper');
  inputText.classList.add('inputText');
  inputText.setAttribute('id','user-post');
  inputText.spellcheck = true;
  postingButton.classList.add('postButton');
  postingButton.setAttribute('id', 'create-post');

  feed.classList.add('feedContainer');
  // userPost.classList.add('userPost');
  userNameContainer.classList.add('userNameContainer');
  userName.classList.add('userName');
  userPicture.classList.add('userPicture');
  userPostPicture.classList.add('userPostPicture');
  contentPostContainer.classList.add('contentPostContainer');
  iconsContainer.classList.add('iconsContainer'); // same class to apply same height
  findHomeText.classList.add('navBarText');
  adoptText.classList.add('navBarText');
  userProfileText.classList.add('navBarText');
  findHomeText.textContent = 'Busca un hogar';
  adoptText.textContent = 'Adoptar';
  userProfileText.textContent = 'Mi cuenta';
  menuBarIconsContainer.classList.add('navBar');

  /* posts icons */
  const iconImagesDelete = document.createElement('img');
  const iconsImagesEdit = document.createElement('img');
  const iconsImagesLike = document.createElement('img');
  /* navBar icons */
  const findHome = document.createElement('img');
  const adopt = document.createElement('img');
  const userProfile = document.createElement('img');

  iconImagesDelete.classList.add('iconImages');
  iconImagesDelete.setAttribute('id', 'delete-btn');

  iconsImagesEdit.classList.add('iconImages');
  iconsImagesEdit.setAttribute('id', 'edit-btn');

  iconsImagesLike.classList.add('iconImages', 'iconLike');
  iconsImagesLike.setAttribute('id', 'like-btn');

  /* navBar icons */
  findHome.classList.add('menuBarImages');
  adopt.classList.add('menuBarImages');
  userProfile.classList.add('menuBarImages');

  postingButton.textContent = 'Publicar';
  userPicture.src = './images/usuario.png';
  userPostPicture.src = './images/usuario.png';
  /* posts icons images */
  iconImagesDelete.src = './images/bin.png';
  iconsImagesEdit.src = './images/editar.png';
  iconsImagesLike.src = './images/heart.png';
  /* navBar images */
  findHome.src = './images/pet-house.png';
  adopt.src = './images/pet-care.png';
  userProfile.src = './images/user.png';

  /* displays input text and button */

  inputWrapper.append(inputText, postingButton);
  postUserContainer.append(userPostPicture, inputWrapper);
  userNameContainer.append(userPicture, userName);
  iconsContainer.append(iconImagesDelete, iconsImagesEdit, iconsImagesLike);

  findHomeContainer.append(findHome, findHomeText);
  adoptContainer.append(adopt, adoptText);
  userProfileContainer.append(userProfile, userProfileText);
  menuBarIconsContainer.append(
    findHomeContainer,
    adoptContainer,
    userProfileContainer
  );
  timeLineContainer.append(postUserContainer, feed, menuBarIconsContainer);
  timeLineMainContainer.append(timeLineContainer);

  //Funcionalidad de desabilitar boton cuando no hay texto en el input
  inputText.addEventListener('input', () => {
    disableButton(inputText, postingButton);
  });

  //Funcionalidad para guardar un nuevo post
  postingButton.addEventListener('click', () => {
    createPost(feed, inputText);
  });

  //Funcionalidad para obtener y renderizar posts cuando carga la pagina
  window.addEventListener('DOMContentLoaded', async () => {
    //extrae objeto docs que son todos los posts
    const { docs } = await getPosts();
    const posts = fireBaseToJSObj(docs);
    renderPosts(posts, feed);
  });

  return timeLineMainContainer;
};
