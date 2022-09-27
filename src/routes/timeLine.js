import { savePost, getPosts, onGetPosts } from '../lib/firestore.js';

// Creating elements
export const timeLine = () => {
  // contenedor principal de los otros dos divs*/
  const timeLineMainContainer = document.createElement('main');
  const timeLineContainer = document.createElement('section');

  const postUserContainer = document.createElement('article');
  const inputWrapper = document.createElement('div');
  const inputText = document.createElement('textarea');
  const postingButton = document.createElement('button');
  const userPostPicture = document.createElement('img');

  const feed = document.createElement('div');
  // const userPost = document.createElement('div');


  const userNameContainer = document.createElement('section');
  const userName = document.createElement('h4');
  const userPicture = document.createElement('img');

  const contentPostContainer = document.createElement('div');
  const iconsContainer = document.createElement('div');

  const navBarItems_1 = document.createElement('div');
  const navBarItems_2 = document.createElement('div');
  const navBarItems_3 = document.createElement('div');
  const navBarText_1 = document.createElement('p');
  const navBarText_2 = document.createElement('p');
  const navBarText_3 = document.createElement('p');
  navBarItems_1.classList.add('iconsNavBar');
  navBarItems_2.classList.add('iconsNavBar');
  navBarItems_3.classList.add('iconsNavBar');

  const menuBarIconsContainer = document.createElement('nav');

  /* adding classes */
  /* dentro de maintimeline debe estar */
  timeLineMainContainer.classList.add('timeLineMainContainer');
  timeLineContainer.classList.add('mainTimeline-Container');
  postUserContainer.classList.add('createPostTLContainer');
  inputWrapper.classList.add('inputWrapper');
  inputText.classList.add('inputText');
  postingButton.classList.add('postButton');

  feed.classList.add('feedContainer');
  //userPost.classList.add('userPost');
  userNameContainer.classList.add('userNameContainer');
  userName.classList.add('userName');
  userPicture.classList.add('userPicture');
  userPostPicture.classList.add('userPostPicture');
  contentPostContainer.classList.add('contentPostContainer');
  iconsContainer.classList.add('iconsContainer'); // same class to apply same height
  navBarText_1.classList.add('navBarText');
  navBarText_2.classList.add('navBarText');
  navBarText_3.classList.add('navBarText');
  navBarText_1.textContent = 'Busca un hogar';
  navBarText_2.textContent = 'Adoptar';
  navBarText_3.textContent = 'Mi cuenta';
  menuBarIconsContainer.classList.add('navBar');

  /* creating  sub-containers for bar and icons to like and edit */
  const iconsImages_1 = document.createElement('img');
  const iconsImages_2 = document.createElement('img');
  const iconsImages_3 = document.createElement('img');
  const menuBarImages_1 = document.createElement('img');
  const menuBarImages_2 = document.createElement('img');
  const menuBarImages_3 = document.createElement('img');
  iconsImages_1.classList.add('iconImages');
  iconsImages_2.classList.add('iconImages');
  iconsImages_3.classList.add('iconImages');
  menuBarImages_1.classList.add('menuBarImages');
  menuBarImages_2.classList.add('menuBarImages');
  menuBarImages_3.classList.add('menuBarImages');

  // inputText.type = 'text';
  postingButton.textContent = 'publicar';
  userPicture.src = './images/usuario.png';
  userPostPicture.src = './images/usuario.png';
  //userName.textContent = 'Adahi Gallardo';
  iconsImages_1.src = './images/bin.png';
  iconsImages_2.src = './images/editar.png';
  iconsImages_3.src = './images/heart.png';
  menuBarImages_1.src = './images/pet-house.png';
  menuBarImages_2.src = './images/pet-care.png';
  menuBarImages_3.src = './images/user.png';

  /* displays input text and button */

  inputWrapper.append(inputText, postingButton);
  postUserContainer.append(userPostPicture, inputWrapper);
  userNameContainer.append(userPicture, userName);
  iconsContainer.append(iconsImages_1, iconsImages_2, iconsImages_3);
  //feed.append(userPost);
  /* userPost.append(
    postUserContainer,
    userNameContainer,
    contentPostContainer,

iconsContainer
  );*/

  navBarItems_1.append(menuBarImages_1, navBarText_1);
  navBarItems_2.append(menuBarImages_2, navBarText_2);
  navBarItems_3.append(menuBarImages_3, navBarText_3);
  menuBarIconsContainer.append(navBarItems_1, navBarItems_2, navBarItems_3);
  timeLineContainer.append(postUserContainer, feed);
  timeLineMainContainer.append(timeLineContainer,menuBarIconsContainer);

  postingButton.addEventListener('click', () => {
    const userPost = inputText.value;
    savePost(userPost);
  });

  window.addEventListener('DOMContentLoaded', async (e) => {
    // querySnapShop traer datos que existen en el momento
    const posts = await getPosts();
    console.log(posts);
    posts.forEach((doc) => {
      const post = doc.data();
      console.log(doc.data());
      feed.innerHTML += `
      <div class="userPost">
      <div class = "userNameContainer">
      <img class="userPicture" src="./images/usuario.png">
      <h4 class="userName">Nombre Usuario</h4>
       </div>
      <div class = "contentPostContainer">
      <p>${post.inputText}</p>
      </div>
      <div class=iconsContainer> 
      <img class="iconImages" src="./images/bin.png">
      <img class="iconImages" src="./images/editar.png">
      <img class="iconImages" src="./images/heart.png">
      <div>
    <div> `;
    });
  });
  //onGetTasks((querySnapshot) => {
  //feed.innerHTML = "";

  /*querySnapshot.forEach((doc) => {
      const task = doc.data();
}*/

  return timeLineMainContainer;
};
