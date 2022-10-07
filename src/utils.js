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
let editStatus = false;
export const setEditStatus = (newStatus) => {
  editStatus = newStatus;
};
export const getEditStatus = () => {
  return editStatus;
};
export let id = '';
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
          <textarea id="text-post" class ="contentPostContainer" readonly>
          ${post.userPost}
          </textarea>
          <div class=iconsContainer> 
          <img class="iconImages" src="./images/bin.png">
          <img class="iconEdit" data-id="${post.id}" src="./images/editar.png">
          <div class="likes-container">
          <span class="counter"> ${post.likes}</span>
          <img class="iconImages iconLike" id=${post.id} src="./images/heart.png">
          </div>          
          </div>
          <img data-id="${post.id}" class='saving-post' src='./images/check.png'>

        </div> `;
  });

  feed.innerHTML = postsHtml.join('');
  // /** Funcion de editar posts **/
  // // Seleccionando todos los botones de edit
  const userEditPost = document.getElementById('user-post');
  console.log(userEditPost);
  const btnsEdit = document.querySelectorAll('.iconEdit');
  const btnSave = document.getElementById('create-post');
  // Boton Edit
  btnsEdit.forEach((btnEdit) => {
    btnEdit.addEventListener('click', async (e) => {
      const doc = await getPost(e.target.dataset.id);
      const post = doc.data();
      userEditPost.value = post.userPost;
      editStatus = true;
      id = e.target.dataset.id;
      btnSave.innerHTML = 'Guardar';
      console.log(editStatus);
    });
  });
  // const btnsEdit = feed.querySelectorAll('#${post.id}');
  // // Ocultando el boton de guardar post
  // const btnsSave = feed.querySelectorAll('.saving-post');
  // console.log(btnsSave);
  // console.log(typeof btnsSave);
  // let isShow = false;
  // console.log(isShow);
  // // Ocultar el contenedor de los iconos
  // const btnContainer = feed.querySelectorAll('.iconsContainer');
  // let isHiden = false;
  // // Funcion para ocultar los iconos
  // function hideIcons() {
  //   for (let i = 0; i < (btnContainer.length - 1); i++) {
  //     if (isHiden === false) {
  //       btnContainer[i].style.display = 'none';
  //       isHiden = true;
  //     }
  //   }
  //   console.log(isHiden);
  //   return isHiden;
  // }
  // // Funcion para mostrar los btnsSave
  // function showBtnSave() {
  //   for (let i = 0; i < (btnsSave.length - 1); i++) {
  //     if (isShow === false) {
  //       btnsSave[i].style.display = 'block';
  //       isShow = true;
  //     }
  //   }
  //   console.log(isShow);
  //   return isShow;
  // }
  // Funcion para eliminar la propiedad readonly del textarea.
  // const textAreas = feed.querySelectorAll('#text-post');
  // function textEdit() {
  //   for (let i = 0; i < (textAreas.length - 1); i++) {
  //     console.log(textAreas[i]);
  //     if (textAreas[i]) {
  //       textAreas[i].removeAttribute('readonly');
  //     }
  //   }
  // }

  // // Ocultar y mostrar elementos segun lo necesario
  // btnsEdit.forEach((btnEdit) => {
  //   btnEdit.addEventListener('click', textEdit);
  // });

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
