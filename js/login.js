

/*
function validar() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;
     re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    
    if ((email == 0 || !email.includes('@') || !email.includes('.')) || password == 0 || name == 0) {
        alert("Email o Name o Password Incorrecto");
    } else {
        localStorage.setItem('usuario', name);
        window.location.href = 'index.html';
        
    }
    // window.open("index.html", "_self"); 
}
let boton = document.getElementById('boton');
boton.addEventListener('click', validar)

*/
let boton = document.getElementById('boton');

function saveUser(){
    let name = document.getElementById('user').value;
    localStorage.setItem('usuario', name);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    boton.addEventListener('click', saveUser);
});
/*
const CLIENT_ID = '753458730460-h4k8sub4vc9c7tl8t3coficmltrbdvp1.apps.googleusercontent.com'
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container')
*/