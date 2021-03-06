let name = document.getElementById('name');
let lastName = document.getElementById('lastName');
let age = document.getElementById('age');
let email = document.getElementById('email');
let telephone = document.getElementById('telephone');
let saveProfile = document.getElementById('saveProfile');
let image = document.getElementById('image');
 


name.value = localStorage.getItem('usuario');

document.getElementById('writeName').innerHTML = localStorage.getItem('usuario');


saveProfile.addEventListener('click', function(){
    let profile = {
        name: name.value,
        lastName: lastName.value,
        age: age.value,
        email: email.value,
        telephone: telephone.value,
        image: image.value
            }
    let jsonProfile = JSON.stringify(profile);
    localStorage.setItem('profile', jsonProfile);
    localStorage.setItem('usuario', profile.name);
    document.getElementById('user-nav').innerHTML = profile.name; 

    document.getElementById('writeLastName').innerHTML = profile.lastName;
    document.getElementById('writeAge').innerHTML = profile.age;
    document.getElementById('writeEmail').innerHTML = profile.email;
    document.getElementById('writeTelephone').innerHTML = profile.telephone;
    document.getElementById('profileImage').src = image.value;
    $('#changeProfile').modal('hide')
})


let buttonModal = document.getElementById('buttonModal');
if(!localStorage.getItem('usuario')){
    buttonModal.disabled = true;
    document.getElementById('ifNotUser').innerHTML = `
    <span class="badge-danger p-1" >Debe Iniciar sesión para modificar su perfil</span>
    ` 
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let jsonParseado = JSON.parse(localStorage.getItem('profile'));
    document.getElementById('writeLastName').innerHTML = jsonParseado.lastName;
    document.getElementById('writeAge').innerHTML = jsonParseado.age;
    document.getElementById('writeEmail').innerHTML = jsonParseado.email;
    document.getElementById('writeTelephone').innerHTML = jsonParseado.telephone;
    document.getElementById('profileImage').src = jsonParseado.image;
});