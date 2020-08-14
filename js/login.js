
function validar() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    if (email != 0 & password != 0) {
        window.location.href = 'index.html';
    } else {
        alert("Email o Password Incorrecto");
    }
    // window.open("index.html", "_self"); 
}

let boton = document.getElementById('boton');
boton.addEventListener('click', validar)


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});
/*
const CLIENT_ID = '753458730460-h4k8sub4vc9c7tl8t3coficmltrbdvp1.apps.googleusercontent.com'
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container')
*/