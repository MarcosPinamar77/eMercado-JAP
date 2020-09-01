//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productName  = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let price = document.getElementById("price");
let category = document.getElementById("category");
let imageContainer = document.getElementById('productImagesGallery');
let vendidos = document.getElementById('soldCount');



function showProductInformation(array){
    productName.innerHTML += array.name;
    productDescription.innerHTML += array.description;
    price.innerHTML += array.cost + " " + array.currency;
    category.innerHTML += array.category;
    vendidos.innerHTML += array.soldCount;
    
    
        for(item in array.images){
           imageContainer.innerHTML +=`
           <div class="col-lg-3 col-md-4 col-6">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="${array.images[item]}" alt="">
                </div>
            </div>
           ` 
        }
    
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           productInformation = resultObj.data;
           console.log(productInformation);
            //Muestro la información en product-info.html
            showProductInformation(productInformation);
           
        }
    });
});