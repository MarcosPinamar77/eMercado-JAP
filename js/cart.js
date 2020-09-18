let contenedor = document.getElementById('cart-container');

function showCart(array){
   let cartItems = array.articles;
   htmlToAppend ="";
   for(item in cartItems){
        htmlToAppend +=`
        <div class="row mb-2">
                        <div class="col-2">
                            <img src="${cartItems[item].src}" class="img-thumbnail">
                        </div>
                        <div class="col-4 pl-0">
                            <h5>${cartItems[item].name}</h5>
                        </div>
                        <div class="col-2">
                            <h5>$${cartItems[item].unitCost} ${cartItems[item].currency}</h5>
                        </div>
                        <div class="col-2">
                          <div class="row justify-content-center">
                          <button class="btn btn-sm btn-light"><b>-</b></button>
                            <h5 class="ml-2 mr-2 align-self-center">${cartItems[item].count}</h5>
                            <button class="btn btn-sm btn-light"><b>+</b></button>
                            </div>
                        </div>
                        <div class="col-2">
                          <h5>Falta</h5>
                      </div>
                    </div>
        `
   }
contenedor.innerHTML += htmlToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e){
getJSONData(CART_INFO_URL)
    .then(response=>{
        if (response.status === "ok"){
            let cartInfo = response.data;
            showCart(cartInfo);
        }
    })
});