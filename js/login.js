//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let email = document.getElementById('email').value;
                let password = document.getElementById('password').value;
                let boton = document.getElementById('boton');


document.addEventListener("DOMContentLoaded", function (e) {

            boton.addEventListener('click', function validar() {
              
                    window.open("index.html", "_self");
            
        });
    });