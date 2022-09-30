import { savePost, onGetPosts } from '../lib/firestore.js';
import { auth } from '../lib/auth.js';

// Creating elements
export const timeLine = () => {
  // contenedor principal de los otros dos divs*/
  const timeLineMainContainer = document.createElement('section');
  const timeLineContainer = document.createElement('article');

  const postUserContainer = document.createElement('article');
  const inputWrapper = document.createElement('div');
  const inputText = document.createElement('textarea');
  const postingButton = document.createElement('button');
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
  /* dentro de maintimeline debe estar */
  timeLineMainContainer.classList.add('timeLineMainContainer');
  timeLineContainer.classList.add('mainTimeline-Container');
  postUserContainer.classList.add('createPostTLContainer');
  inputWrapper.classList.add('inputWrapper');
  inputText.classList.add('inputText');
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

  iconsImagesLike.classList.add('iconImages');
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
  // feed.append(userPost);
  /* userPost.append(
    postUserContainer,
    userNameContainer,
    contentPostContainer,
    iconsContainer
  ); */
  findHomeContainer.append(findHome, findHomeText);
  adoptContainer.append(adopt, adoptText);
  userProfileContainer.append(userProfile, userProfileText);
  menuBarIconsContainer.append(findHomeContainer, adoptContainer, userProfileContainer);
  timeLineContainer.append(postUserContainer, feed, menuBarIconsContainer);
  timeLineMainContainer.append(timeLineContainer);

  postingButton.addEventListener('click', () => {
    const userPost = inputText.value;
    const user = auth.currentUser;
    const userEmail = user.email;
    savePost(userEmail, userPost);
    inputText.value = '';
  });

  window.addEventListener('DOMContentLoaded', async () => {
    // querySnapShop traer datos que existen en el momento
    onGetPosts((posts) => {
      posts.forEach((doc) => {
        const post = doc.data();
        // console.log(doc.data());
        feed.innerHTML += `
        <div class="userPost">
        <div class = "userNameContainer">
        <img class="userPicture" src="./images/usuario.png">
        <h4 class="userName">${post.userEmail}</h4>
         </div>
        <div class = "contentPostContainer">
        <p>${post.userPost}</p>
        </div>
        <div class=iconsContainer> 
        <img class="iconImages" src="./images/bin.png">
        <img class="iconImages" src="./images/editar.png">
        <img class="iconImages" src="./images/heart.png">
        <div>
      <div> `;
      });
    });
  });

  /* function postButtonDisabled() {
    postingButton.disabled = inputText.value === '';
    inputText.addEventListener('input', () => {
      postButtonDisabled();
    });
  }
  postButtonDisabled(); */

  // const posts = await getPosts();
  // console.log(posts);
  /* posts.forEach((doc) => {
      const post = doc.data();
      console.log(doc.data());
      feed.innerHTML += `
      <div class="userPost">
      <div class = "userNameContainer">
      <img class="userPicture" src="./images/usuario.png">
      <h4 class="userName">${post.userEmail}</h4>
       </div>
      <div class = "contentPostContainer">
      <p>${post.userPost}</p>
      </div>
      <div class=iconsContainer>
      <img class="iconImages" src="./images/bin.png">
      <img class="iconImages" src="./images/editar.png">
      <img class="iconImages" src="./images/heart.png">
      <div>
    <div> `;
    });
  }); */

  // onGetTasks((querySnapshot) => {
  // feed.innerHTML = "";

  /* querySnapshot.forEach((doc) => {
      const task = doc.data();
} */

  return timeLineMainContainer;
};
