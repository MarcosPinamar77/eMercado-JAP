const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});


 // Your web app's Firebase configuration
 let firebaseConfig = {
  apiKey: "AIzaSyBnzJoSxUWtkbnu1j0iwjWgylUf5Xpw0Ns",
  authDomain: "ejemplo-clase-e5222.firebaseapp.com",
  databaseURL: "https://ejemplo-clase-e5222.firebaseio.com",
  projectId: "ejemplo-clase-e5222",
  storageBucket: "ejemplo-clase-e5222.appspot.com",
  messagingSenderId: "204571699995",
  appId: "1:204571699995:web:7a131f2e88292549a541be"
};

firebase.initializeApp(firebaseConfig);

let loginGoogle = document.querySelector('#login-google');
let logoutGoogle = document.querySelector('#logout-google');
let logout = document.querySelector('#cerrar-sesion');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user)
    cerrarSesion();
    let user_nav = document.getElementById('user-nav');
    user_nav.innerHTML = user.displayName;
    console.log(user.displayName)
    //window.location.href = 'index.html';
    
    const displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
 
    // ...
  } else {
    // User is signed out.
    console.log("No existe user");
    iniciarSesion();
    // ...
  }
});

function iniciarSesion(){
  loginGoogle.addEventListener('click', async()=>{
    //console.log("Click")
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(){
        window.location.href = 'index.html';
      });
    } catch (error){
      console.log(error)
    }
  })
  
}

function cerrarSesion(){
logout.addEventListener('click', ()=>{
  firebase.auth().signOut()
})
}

let user_nav = document.getElementById('user-nav');
user_nav.innerHTML = localStorage.getItem('usuario');