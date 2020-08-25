const ORDER_ASC_BY_PRICE = "-+";
const ORDER_DESC_BY_PRICE = "+-";
const ORDER_BY_PROD_REL = "Rel.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);
            if ( aPrice < bPrice ){ return -1; }
            if ( aPrice > bPrice ){ return 1; }
            return 0;
        });

    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);
            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
        });

    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function showProducts() {
    let htmlContentToAppend = "";

    for(item in currentProductsArray){
        let product = currentProductsArray[item];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){
        
      htmlContentToAppend += `
        <a href="./product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.imgSrc}"  class="img-thumbnail">
                </div>
                        <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4>${product.name}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                            </div>
                            <p>${product.description}</p>
                            <p class="text-muted">${product.cost} usd</p>
                        </div> 
         
            </div>
        </a>
      `  
    }
    }
   document.getElementById('product-container').innerHTML = htmlContentToAppend; 

}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProducts();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL)
        .then(response => {
            if (response.status === "ok") {
                sortAndShowProducts(ORDER_ASC_BY_PRICE, response.data);
            }
        })
        document.getElementById("priceAsc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_ASC_BY_PRICE);
        });
        document.getElementById("priceDesc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_PRICE);
        });
        document.getElementById("sortByRel").addEventListener("click", function(){
            sortAndShowProducts(ORDER_BY_PROD_REL);
        });

        document.getElementById("clean").addEventListener("click", function(){
            document.getElementById("priceMin").value = "";
            document.getElementById("priceMax").value = "";
    
            minPrice = undefined;
            maxPrice = undefined;
    
            showProducts();
        });

        document.getElementById("rangeFilterPrice").addEventListener("click", function(){
            //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
            
            minPrice = document.getElementById("priceMin").value;
            maxPrice = document.getElementById("priceMax").value;
    
            if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
                minPrice = parseInt(minPrice);
            }
            else{
                minPrice = undefined;
            }
    
            if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
                maxPrice = parseInt(maxPrice);
            }
            else{
                maxPrice = undefined;
            }
    
            showProducts();
        });
 });
