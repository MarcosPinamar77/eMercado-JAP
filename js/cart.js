let contenedor = document.getElementById('cart-container');

function showCart(array){
   let cartItems = array.articles;
   htmlToAppend ="";
   for(item in cartItems){
       let totalCost = cartItems[item].count * cartItems[item].unitCost;
       if(cartItems[item].currency == "USD"){
           totalCost = totalCost * 40;
       }
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
                        <input type="email" class="form-control" value="${cartItems[item].count}">
                        </td>
                        <td class="col text-center"><strong>$${cartItems[item].unitCost} ${cartItems[item].currency}</strong></td>
                        <td class="col text-center"><strong>$${totalCost} UYU</strong></td>
                        <td class="col">
                        <button type="button" class="btn btn-danger">
                            <span class="glyphicon glyphicon-remove"></span> Remove
                        </button></td>
                    </tr>
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