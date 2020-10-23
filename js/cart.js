let contenedor = document.getElementById('cart-container');
let cont2 = contenedor.children;
let subtotal = document.getElementById('subtotal');
let total = document.getElementById('total');
let envio = document.getElementById('envio');
let manySend = document.getElementById('manySend')
let premium = document.getElementById('premium');
let express = document.getElementById('express');
let standard = document.getElementById('standard');
let formSends = document.getElementById('form-Sends');
let radioCredit = document.getElementById('creditRadio').checked;
let transferRadio = document.getElementById('transferRadio').checked;
let aceptarPago = document.getElementById('aceptarPago');
let radioSend = document.getElementsByClassName('radioSend');
let valorEnvio = 0;
let cartItems = [];
//Función que dibuja en el HTML el contenido del JSON
function showCart(array) {
    let cartItems = array.articles;
    htmlToAppend = "";
    let allSubtotal = 0;
    for (item in cartItems) {
        allSubtotal += productSubTotal(cartItems);
        htmlToAppend += `
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
    total.innerHTML += allSubtotal; 

}

function productSubTotal(cartItems) {
    // funcion que devuelva el costo total de un producto segun la cantidad
    let totalCost = cartItems[item].count * cartItems[item].unitCost;
    if (cartItems[item].currency == "USD") {
        totalCost = totalCost * 40;
    }
    return totalCost;
};

//Función que actualiza el subtotal x producto 
//(Acá también se ejecuta la Función que actualiza el subtotal del carrito)

function updateSubtotal(cartItems) {

    for (item in cartItems) {
        let suma = 0;
        let count = document.getElementById('productCount' + item);
        let cost = document.getElementById('productCost' + item);
        let costNumber = parseInt(cost.innerHTML, 10);
        let productSubtotal = document.getElementById('productSubtotal' + item);

        if (cartItems[item].currency == "USD") {
            costNumber = costNumber * 40;
        }

        count.addEventListener('change', function() {
            let countNumber = count.value;
            suma = costNumber * countNumber;
            productSubtotal.innerHTML = suma;
            updateCartSubtotal(cartItems);
        });

    }
   
}

//Función que actualiza el subtotal del carrito
function updateCartSubtotal(cartItems) {
    let acumulador = 0;
    for (item in cartItems) {
        let productSubtotal = document.getElementById('productSubtotal' + item).innerHTML;
        let subtotalNumber = parseInt(productSubtotal, 10);
        acumulador += subtotalNumber;

    }
    subtotal.innerHTML = acumulador;
    envio.innerHTML = Math.round(acumulador * valorEnvio);
    total.innerHTML = Math.round(acumulador + (acumulador * valorEnvio));
}


formSends.addEventListener('change', function() {
    //console.log(this.buttonSend[0].checked);
    for (item in this.buttonSend) {
        if (this.buttonSend[item].checked) {
            valorEnvio = parseFloat(this.buttonSend[item].value);
        }
    }
    updateCartSubtotal(cartItems)
});


//calculateSend2()
//Función para deshabilitar inputs de la opción de pago que no está seleccionada
function radioCreditSelected() {
    document.getElementById('transferNumber').disabled = true;
    document.getElementById('cardNumber').disabled = false;
    document.getElementById('mounth').disabled = false;
    document.getElementById('day').disabled = false;
    document.getElementById('cvs').disabled = false;
};
document.getElementById('creditRadio').addEventListener('change', radioCreditSelected);

function radioTransferSelected() {
    document.getElementById('transferNumber').disabled = false;
    document.getElementById('cardNumber').disabled = true;
    document.getElementById('mounth').disabled = true;
    document.getElementById('day').disabled = true;
    document.getElementById('cvs').disabled = true;

};
document.getElementById('transferRadio').addEventListener('change', radioTransferSelected)


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_2)
        .then(response => {
            if (response.status === "ok") {
                let cartInfo = response.data;
                cartItems = response.data.articles;
                showCart(cartInfo);
            }
        });
    console.log(contenedor.children)
});