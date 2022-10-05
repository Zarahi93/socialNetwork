import { auth } from '../lib/auth.js';
import {
  savePost,
  dataBaseListener,
  getPosts,
  db, //data base
  docRef,
  getPost,
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
          <textarea id="text-post" class = "contentPostContainer" readonly>
          ${post.userPost}
          </textarea>
          <div class=iconsContainer> 
          <img class="iconImages" src="./images/bin.png">
          <img class="iconEdit" id="${post.id}" src="./images/editar.png">
          <div class="likes-container">
          <span class= "counter"> ${post.likes}</span>
          <img class="iconImages iconLike" id=${post.id} src="./images/heart.png">
          <img class='editing-post' src='./images/check.png'>
          </div>
    
          
          </div>
        </div> `;
  });

  feed.innerHTML = postsHtml.join('');
/** Funcion de editar posts **/
  // Seleccionando todos los botones de edit
  const userEditPost = document.querySelectorAll('#user-post');
  const btnsEdit = document.querySelectorAll('.iconEdit');

  // Ocultando el boton de guardar post
  const btnsSave = document.querySelectorAll('.editing-post');
  console.log(btnsSave);
  let isShow = false;
  console.log(isShow);
  // const btnSave = btnsSave.forEach(btn);
  function showBtnSave() {
    if (isShow === false) {
      btnsSave.style.display = 'block';
      isShow = true;
    } else {
      btnsSave.style.display = 'none';
      isShow = false;
    }
    return isShow;
  }

  btnsEdit.forEach((btnEdit) => {
    btnEdit.addEventListener('click', showBtnSave);
  });

  // Boton Edit
  btnsEdit.forEach((btnEdit) => {
    btnEdit.addEventListener('click', async (e) => {
      const doc = await getPost(e.target.id);
      const post = doc.data();
      console.log(doc.data());
      userEditPost.value = post.userPost;
      console.log(userEditPost.value);
    });
  });

/**Fin de funcion de editar**/
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
// creando posts funcion
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
