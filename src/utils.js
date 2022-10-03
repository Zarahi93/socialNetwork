import { auth } from '../lib/auth.js';
import {
  savePost,
  dataBaseListener,
  getPosts,
  db, //data base
  docRef,
  updateLike,
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
  console.log(objectsToJS);
  return objectsToJS;
};

// funcion para contar los likes
const countinglikes = async (e) => {
  const postReference = docRef(db, 'posts', e.target.id);
  console.log(postReference);
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
          <img class="iconImages" src="./images/bin.png">
          <img class="iconImages" src="./images/editar.png">
          <div class="likes-container">
          <span class= "counter"> ${post.likes}</span>
          <img class="iconImages iconLike" id=${post.id} src="./images/heart.png">
          
          </div>
          
          </div>
        </div> `;
  });

  feed.innerHTML = postsHtml.join('');

  // seleccionando todos los botones de like
  const likesButtons = document.querySelectorAll('.iconLike');
  //console.log(likesButtons);
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
export const createPost = (feed, inputText) => {
  const userPost = inputText.value;
  const userObject = auth.currentUser;
  const userEmail = userObject.email;
  const likes = 0;
  savePost(userEmail, userPost, likes);
  inputText.value = '';
  /*cuando detecta un cambio en la base de datos, renderiza los post de nuevo, llamando dataBaseListener desde FireStore*/
  dataBaseListener(
    /* vuelve a traer los posts y renderiza */
    async () => {
      //extrae objeto docs
      const { docs } = await getPosts();
      //console.log(await getPosts());
      //deconstruccion de objetos
      //const {apellido} = {nombre: 'maria', apellido: 'guzmman'}
      // transformando data de firebase a js objects
      const posts = fireBaseToJSObj(docs);
      renderPosts(posts, feed);
    }
  );
};

//Like function
const likePosts = () => {};
