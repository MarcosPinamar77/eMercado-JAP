let contenedor = document.getElementById('cart-container');
let subtotal = document.getElementById('subtotal');

function showCart(array){
   let cartItems = array.articles;
   htmlToAppend ="";
   let allSubtotal = 0;
   for(item in cartItems){
        allSubtotal += productSubTotal(cartItems);
        htmlToAppend +=`
                    <tr>
                        <td class="col">
                        <div class="row pl-3">
                            <img class="img-fluid" src="${cartItems[item].src}" style="width: 72px; height: 72px;">
                            <div class="col ml-1 pl-0 pr-0">
                                <h4 style="width: 80%" class="pr-0">${cartItems[item].name}</h4>
                                <span>Estado: </span><span class="text-success"><strong>In Stock</strong></span>
                            </div>
                        </div>
                        </td>
                        <td class="col" style="text-align: center">
                        <input type="number" min="1" class="form-control" value="${cartItems[item].count}" id="productCount${item}">
                        </td>
                        <td class="col text-center"><strong><span id="productCost${item}">${cartItems[item].unitCost}</span> ${cartItems[item].currency}</strong></td>
                        <td class="col text-center"><strong>$<span id="productSubtotal${item}">${productSubTotal(cartItems)}</span> UYU</strong></td>
                        <td class="col">
                        <button type="button" class="btn btn-danger">
                        <i class="far fa-trash-alt"></i> Borrar
                        </button></td>
                    </tr>
        `
    
        
   }
   contenedor.innerHTML = htmlToAppend;
   subtotal.innerHTML += allSubtotal;
   updateSubtotal(cartItems);
   
}

function productSubTotal(cartItems){
    // funcion que devuelva el costo total de un producto segun la cantidad
    let totalCost = cartItems[item].count * cartItems[item].unitCost;
        if(cartItems[item].currency == "USD"){
            totalCost = totalCost * 40;
        }
     return totalCost;   
 };

 //Función que actualiza el subtotal x producto y el subtotal del carrito al cambiar la cantidad de productos seleccionados
 function updateSubtotal(cartItems){
    
     for(item in cartItems){
        let suma = 0;
         let count = document.getElementById('productCount'+item);
         let cost = document.getElementById('productCost'+item);
         let costNumber = parseInt(cost.innerHTML, 10);
         let productSubtotal = document.getElementById('productSubtotal'+item);  

         if(cartItems[item].currency == "USD"){
            costNumber = costNumber * 40;
        }
         
         count.addEventListener('change', function(){
            let countNumber = count.value;
            suma = costNumber * countNumber;
            productSubtotal.innerHTML = suma;
            updateCartSubtotal(cartItems);
        });
         
     }
      
 }

function updateCartSubtotal(cartItems){
    let acumulador = 0;
     for(item in cartItems){
         let productSubtotal = document.getElementById('productSubtotal'+item).innerHTML;
        let subtotalNumber = parseInt(productSubtotal, 10);
        acumulador += subtotalNumber;
        
     }
     subtotal.innerHTML = "$"+acumulador;
 }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
getJSONData(CART_INFO_2)
    .then(response=>{
        if (response.status === "ok"){
            let cartInfo = response.data;
            showCart(cartInfo);
        }
    })
});