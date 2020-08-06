
function showProducts(array) {
    let htmlContentToAppend = "";

    for(item in array){
        let product = array[item];
      htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.imgSrc}"  class="img-thumbnail">
                </div>
                        <div class="col">
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <p class="text-muted">${product.cost} usd</p>
                        </div> 
                    </div> 
            </div>
        </div>
      `  
    
    }
   document.getElementById('product-container').innerHTML = htmlContentToAppend; 

}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL)
        .then(response => {
            if (response.status === "ok") {
                showProducts(response.data)
            }
        })

});