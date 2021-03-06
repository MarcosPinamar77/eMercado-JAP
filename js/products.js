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
      

        <div class="col-md-4">
                  <div class="card mb-4 shadow-sm">
                    <img src="${product.imgSrc}" class="bd-placeholder-img card-img-top img-fluid" width="100%" height="225"/>
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">
                      ${product.description}
                      </p>
                      <p class="card-text"><small class="text-muted">${product.cost} ${product.currency}</small></p>
                     
                      
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <a href="./product-info.html" >
                          <button type="button" class="btn btn-sm btn-outline-secondary">Ver Producto</button>
                          </a>
                        </div>
                        <small class="text-muted">${product.soldCount} vendidos</small>
                      </div>
                    </div>
                  </div>
                </div>

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




//-------------------------------------------------------------
 // Buscador de Productos

 const searchInput = document.querySelector('#searchForm');
// const searchButton = document.querySelector('#searchButton');

 function filtrar(){
    const searchText = searchInput.value.toLowerCase();
    let htmlToAppend = '';  
    //console.log(searchText);

    for(item in currentProductsArray){
        let product = currentProductsArray[item];
        let title = product.name.toLowerCase();
        let description = product.description.toLowerCase();
        
        if((title.indexOf(searchText) !== -1) || (description.indexOf(searchText) !== -1)){
           htmlToAppend += `
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
                               <p class="text-muted">${product.cost} ${product.currency}</p>
                           </div> 
            
               </div>
           </a>
         `  
        }
       
        }
        document.getElementById('product-container').innerHTML = htmlToAppend;
        if(htmlToAppend.innerHTML === ''){
            document.getElementById('product-container').innerHTML =`
              <h2>No result</h2>
              `
            //document.getElementById('product-container').innerHTML = htmlToAppend;
        }
        //document.getElementById('product-container').innerHTML = htmlToAppend;

    }
 //---------------------------------------------------------------





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL)
        .then(response => {
            if (response.status === "ok") {
                //const productos = response.data;
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
        searchInput.addEventListener('keyup', filtrar)
 });

