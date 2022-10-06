import { auth } from '../lib/auth.js';
import {
  savePost,
  dataBaseListener,
  getPosts,
  getPost,
  updateLike,
  deleteposts,
} from './lib/firestore.js';
//convierte los objetos firebase a objetos js
export const fireBaseToJSObj = (objectsfirebase) => {
  //console.log(objectsfirebase);
  const objectsToJS = objectsfirebase.map((object) => {
    const idObject = object.id; //primero sacando el id, antes de tranformarse a JS
    const objectJS = object.data();
    //agregando propiedad id
    objectJS.id = idObject;
    return objectJS;
  });
  // console.log(objectsToJS);
  return objectsToJS;
};

// funcion para contar los likes
const countinglikes = async (e) => {
  const feed = document.querySelector('.feedContainer');

  const fireBasePost = await getPost(e.target.id);
  const post = fireBasePost.data();
  const { likes } = post;
  let likesUpdated = likes + 1;

  await updateLike(
    e.target.id,
    { likes: likesUpdated }
    //{ userPost: 'cambiando un post' }
  );

  // necesito una funcion que: al dar click aumente +1 al valor que se imprime en el spam...
  // el valor resultante, lo tengo que guardar en una variable para que.. cuando se aumente cada vez, se gaurde en esa variable
  //y ese va a ser el valor que va a tomar likes
};

//funcion para renderizar posts
export const renderPosts = (posts, feed) => {
  const postsHtml = posts.map((post) => {
    return ` 
          <div class="userPost">
          <div class = "userNameContainer">
          <img class="userPicture" src="./images/usuario.png">
          <h4 class="userName">${post.userEmail}</h4>
           </div>       
          <div class = "contentPostContainer">
          <p>${post.userPost}</p> 
          </div>
          <div class=iconsContainer> 
          <img class="delete-btns" data-id="${post.id}" src="./images/bin.png">
          <img class="iconImages" src="./images/editar.png">
          <div class="likes-container" id=${post.id}>
           <span class= "counter"> ${post.likes}</span>
           <img class="iconLike"  src="./images/heart.png">
          </div>
          </div>
        </div> `;
  });

  feed.innerHTML = `${postsHtml.join('')}<div class='divider'></div>`;
  // seleccionando botones para eliminar posts

  const deleteBtns = feed.querySelectorAll('.delete-btns');

  deleteBtns.forEach((btnDelete) => {
    btnDelete.addEventListener('click', ({ target: { dataset } }) => {
      // se hace econsulta con la base de datos
      deleteposts(dataset.id);
    });
  });

  // seleccionando todos los botones de like
  const likesButtons = document.querySelectorAll('.likes-container');

  likesButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', (e) => {
      countinglikes(e);
    });
  });
};
// función para desabilitar el button a menos que haya input
export const disableButton = (inputText, postingButton) => {
  if (inputText.value.length > 0) {
    postingButton.removeAttribute('disabled');
  } else postingButton.setAttribute('disabled', '');
};
//creando posts funcion
export const createPost = (inputText, postingButton) => {
  console.log(typeof 'userPost');
  const userPost = inputText.value;
  const userObject = auth.currentUser;
  const userEmail = userObject.email;
  const likes = 0;
  savePost(userEmail, userPost, likes);
  inputText.value = '';
  disableButton(inputText, postingButton);
  /*cuando detecta un cambio en la base de datos, renderiza los post de nuevo, llamando dataBaseListener desde FireStore*/
};
