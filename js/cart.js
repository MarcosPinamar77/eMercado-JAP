let contenedor = document.getElementById('cart-container');
let subtotal = document.getElementById('subtotal');
let total = document.getElementById('total');
let envio = document.getElementById('envio');
let formSends = document.getElementById('form-Sends');
let radioSend = document.getElementsByClassName('radioSend');
let valorEnvio = 0;
let cartItems = [];
// Boton que guarda y valida la dirección ingresada
let saveAdress = document.getElementById('saveAdress');
// Variables donde se accede a los input de dirección 
let street = document.getElementById('street');
let departament = document.getElementById('departament');
let door = document.getElementById('door');
let apartament = document.getElementById('apartament');
// Variables donde se guarda la dirección ingresada
let savedStreet = "";
let savedDepartament ="";
let savedDoor ="";
let savedApartament ="";
// Variables donde se accede a los input de forma de pago 
let cardNumber = document.getElementById('cardNumber');
let cvv = document.getElementById('cvv');
let expirationMounth = document.getElementById('mounth');
let expirationYear = document.getElementById('year');
let transferNumber = document.getElementById('transferNumber')
// Boton que guarda y valida la forma de pago
let aceptarPago = document.getElementById('aceptarPago');
// Variables donde se guarda la forma de pago ingresada
let savedCardNumber = "";
let savedCvv = "";
let savedMounthExpiration ="";
let savedYearExpiration = "";
let savedTransferNumber ="";
//Variables para acceder a los radio buttons de forma de pago
let creditRadio = document.getElementById('creditRadio')
let transferRadio = document.getElementById('transferRadio')
//Variables para escribir los datos en el resumen final de la compra
let resumeAdress = document.getElementById('resumeAdress');
let resumePayment = document.getElementById('resumePayment');
let resumeTotal = document.getElementById('resumeTotal');
let resumeSend = document.getElementById('resumeSend');
let resumeSendCost = document.getElementById('resumeSendCost');
//Acceso al botón que confirma la compra
let finishPurchase = document.getElementById('finish');


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
                        <button type="button" class="btn btn-danger" id="delete${item}">
                        <i class="far fa-trash-alt"></i> Borrar
                        </button></td>
                    </tr>
        `


    }
    contenedor.innerHTML = htmlToAppend;
    subtotal.innerHTML += allSubtotal;
    resumeSubtotal.innerHTML += allSubtotal;
    updateSubtotal(cartItems);
    total.innerHTML += allSubtotal; 
    resumeTotal.innerHTML += allSubtotal;

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
    resumeSubtotal.innerHTML = acumulador;
    envio.innerHTML = Math.round(acumulador * valorEnvio);
    resumeSendCost.innerHTML = Math.round(acumulador * valorEnvio);
    total.innerHTML = Math.round(acumulador + (acumulador * valorEnvio));
    resumeTotal.innerHTML =  Math.round(acumulador + (acumulador * valorEnvio));
}

//Evento que reguistra cuando se modifica la opción de envío
formSends.addEventListener('change', function() {
    //console.log(this.buttonSend[0].checked);
    for (item in this.buttonSend) {
        if (this.buttonSend[item].checked) {
            valorEnvio = parseFloat(this.buttonSend[item].value);
            resumeSend.innerHTML = this.buttonSend[item].id;
            let noSelection = document.getElementById('noSelection');
            noSelection.innerHTML = "";
        }
    }
    updateCartSubtotal(cartItems)
});


//Función para deshabilitar inputs de la opción de pago que no está seleccionada
function radioCreditSelected() {
    document.getElementById('transferNumber').disabled = true;
    document.getElementById('cardNumber').disabled = false;
    document.getElementById('mounth').disabled = false;
    document.getElementById('year').disabled = false;
    document.getElementById('cvv').disabled = false;
};
//Evento que inhabilita los campos de la forma de pago que no está seleccionada
creditRadio.addEventListener('change', radioCreditSelected);
//Función para deshabilitar inputs de la opción de pago que no está seleccionada
function radioTransferSelected() {
    document.getElementById('transferNumber').disabled = false;
    document.getElementById('cardNumber').disabled = true;
    document.getElementById('mounth').disabled = true;
    document.getElementById('year').disabled = true;
    document.getElementById('cvv').disabled = true;

};
//Evento que inhabilita los campos de la forma de pago que no está seleccionada
transferRadio.addEventListener('change', radioTransferSelected)



//Función que guarda y valida la dirección
function saveAndValidateAdress(){
    if(street.value != 0 && door.value != 0 && departament.value != "Seleccione Departamento"){  
        savedStreet = street.value;
        savedDepartament = departament.value;
        savedDoor = door.value;
        if(apartament.value != 0){
            savedApartament = "Apto " + apartament.value;
        }
        
        $('#adressModal').modal('hide');
        resumeAdress.innerHTML = savedDepartament + " " + savedStreet + " " + savedDoor + " " + savedApartament;
        
        
    }
    else{
        let alert = document.getElementById('alertAdress');
        alert.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            Faltan completar campos.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
    }
    
}

// Función que guarda y valida el pago
function saveAndValidatePayment(){
    if(creditRadio.checked){
        if(cardNumber.value != 0 && cvv.value != 0 && expirationMounth.value != 0 && expirationYear.value != 0){
            savedCardNumber = cardNumber.value;
            savedCvv = cvv.value;
            savedMounthExpiration = expirationMounth.value;
            savedYearExpiration = expirationYear.value;
            resumePayment.innerHTML = "Tarjeta de crédito"
            $('#paymentModal').modal('hide');
        }
        else{
            let alertCredit = document.getElementById('alertCredit');
        alertCredit.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            Error. Verifique haber completado todos los campos y que los datos sean correctos.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `
        }
    }
    else if(transferRadio.checked){
        if(transferNumber.value != 0){
            savedTransferNumber = transferNumber.value;
            resumePayment.innerHTML = "Transferencia bancaria"
            $('#paymentModal').modal('hide');
        }
        else{
            let alertTransfer = document.getElementById('alertTransfer');
            alertTransfer.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                Faltan completar campos.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `
        }
    }
    else{
        
        alert("Debe seleccionar una opción de pago")
    }  
}

//Evento que guarda la dirección ingresada
saveAdress.addEventListener('click', saveAndValidateAdress)

//Evento que guarda la forma de pago ingresada
aceptarPago.addEventListener('click', saveAndValidatePayment)

//Función que valida que se hayan seleccionado todos los pasos para realizar la compra
function finalizePurchase(){
    if(resumeAdress.innerText != "Falta ingresar dirección" && resumePayment.innerText != "Falta ingresar forma de pago" && resumeSend.innerHTML != "Falta seleccionar"){
        $('#exitePurchase').modal('show');
        $('#buy').modal('hide');
    }
    else{
        let alertFinish = document.getElementById('alertFinish');
        
        alertFinish.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                Error. Verifique haber seleccinado un método de envío e ingresado una dirección y forma de envío validas.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
        `
    }
}
finishPurchase.addEventListener('click', finalizePurchase)

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
});