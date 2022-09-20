// Creating elements
export const timeLine = () => {
  // contenedor principal de los otros dos divs*/
  const timeLineMainContainer = document.createElement('section');
  const timeLineContainer = document.createElement('article');

  const postUserContainer = document.createElement('article');
  const inputWrapper = document.createElement('div');
  const inputText = document.createElement('input');
  const postingButton = document.createElement('button');
  const userPostPicture = document.createElement('img');

  const feed = document.createElement('div');

  const userNameContainer = document.createElement('div');
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

  const menuBarIconsContainer = document.createElement('div');

  /* adding classes */
  /* dentro de maintimeline debe estar */
  timeLineMainContainer.classList.add('timeLineMainContainer');
  timeLineContainer.classList.add('mainTimeline-Container');
  postUserContainer.classList.add('createPostTLContainer');
  inputWrapper.classList.add('inputWrapper');
  inputText.classList.add('inputText');
  postingButton.classList.add('postButton');

  feed.classList.add('feedContainer');
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

  inputText.type = 'text';
  postingButton.textContent = 'publicar';
  userPicture.src = './images/usuario.png';
  userPostPicture.src = './images/usuario.png';
  userName.textContent = 'Adahi Gallardo';
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
  feed.append(
    postUserContainer,
    userNameContainer,
    contentPostContainer,

    iconsContainer
  );
  iconsContainer.append(iconsImages_1, iconsImages_2, iconsImages_3);

  navBarItems_1.append(menuBarImages_1, navBarText_1);
  navBarItems_2.append(menuBarImages_2, navBarText_2);
  navBarItems_3.append(menuBarImages_3, navBarText_3);
  menuBarIconsContainer.append(navBarItems_1, navBarItems_2, navBarItems_3);
  timeLineContainer.append(postUserContainer, feed, menuBarIconsContainer);
  timeLineMainContainer.append(timeLineContainer);

  return timeLineMainContainer;
};
