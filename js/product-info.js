
let prodInfo = document.getElementById('prodInfo')
let imageContainer = document.getElementById('productImagesGallery');
let relatedContainer = document.getElementById('related-products');

//Grupo de variables usadas en la sección de hacer un nuevo comentario
let commentSection = document.getElementById('comment-section');
let commentInput = document.getElementById('comment-input');
let commentSend = document.getElementById('comment-send');
let starOne = document.getElementById('starOne');
let starTwo = document.getElementById('starTwo');
let starThree = document.getElementById('starThree');
let starFour = document.getElementById('starFour');
let starFive = document.getElementById('starFive');
let starSelected;

//Función para mostrar información del producto
function showProductInformation(array) {
  prodInfo.innerHTML =`
  <div class="row">
          <div class="col-7 pl-1" id="image-carousel">
              <div id="carousel" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="${array.images[0]}" class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="${array.images[1]}" class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="${array.images[2]}" class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="${array.images[3]}" class="d-block w-100" alt="...">
                      </div>
                      <div class="carousel-item">
                        <img src="${array.images[4]}" class="d-block w-100" alt="...">
                      </div>
                  </div>
                  <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
               </div>
          </div>
          <div class="col-4 d-flex flex-column justify-content-between">
                <div>
                <h3><b id="productName">${array.name}</b></h3>
                <ul class="list-group list-group-flush pl-0">
                  <li class="list-group-item pl-0 pt-1 pb-1" id="price">${array.cost} ${array.currency}</li>
                  <li class="list-group-item pl-0 pt-1 pb-1" id="category">${array.category}</li>
                  <li class="list-group-item pl-0 pt-1 pb-1" id="soldCount">${array.soldCount} Vendidos</li>
                </ul>
                </div>
              <div class="mb-0">
                <h5>Descripción</h5>
                <p id="productDescription" class="mb-0">${array.description}</p>
              </div>
          </div>
          </div>
  `

  for (item in array.images) {
    imageContainer.innerHTML += `
           <div class="col-lg-2 col-md-4 col-2">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="${array.images[item]}" alt="">
                </div>
            </div>
           `
  }

};

//Función para mostrar productos relacionados
function showRelated(relatedArray){
  getJSONData(PRODUCTS_URL).then(function(response){
    if(response.status === "ok"){
      let productList = response.data;
      //console.log(array.relatedProducts);

   
      
      for(item in relatedArray){
        let relPosition = relatedArray[item];
        let prodPosition = productList[relPosition]
      //console.log(relatedArray)
      relatedContainer.innerHTML +=`
              <div class="clas-body d-flex flex-column card mr-2 col-3 p-0">
                <div class="card-body p-2">
                    <img src="${prodPosition.imgSrc}" alt="${prodPosition.name}" class="card-img-top">
                    <div class="pt-1 pb-1">
                        <h5 class"card-title>${prodPosition.name}</h5>
                        <h6 class="card-subtitle text-muted">${prodPosition.soldCount} vendidos</h6>
                    </div>
                    <p>${prodPosition.description}</p>
                </div>
                <div class="card-footer p-3">
                <a href="./product-info.html" class="btn btn-primary d-flex justify-content-center">Ver Producto</a>
                </div>
            </div>
            `
      }
      
       
    }
  })

}

//Función para traer los comentarios que se encuentran en el JSON
function showComments(array) {
  for (item in array) {
    let innerScore;
    let productScore = array[item].score;
    innerScore = (`<span class="fa fa-star checked"></span>`).repeat(productScore);
    innerScore += (`<span class="fa fa-star"></span>`).repeat(5 - productScore);
    commentSection.innerHTML += `
        <div class="row mb-2">
        <div class="col-8">
          <div class="card">
            <div class="post-heading pl-2 pt-2">
              <div class="float-left meta">
                <div class="title h5">
                  <h4 class="text-primary"><b>${array[item].user}</b></h4>

                </div>
                <h6 class="text-muted time">${array[item].dateTime}</h6>
                <div class="mb-1"><span class="badge badge-light class="score-container">
                  ${innerScore}
                  </span></div>
              </div>
            </div>
            <div class="post-description pl-2 pr-2">
              <p>${array[item].description}</p>
            </div>
          </div>
        </div>
      </div>
        `
  }

}

//Función para añadir un comentario
function addComment() {
  let date = new Date();
  if (commentInput.value != 0) {
    commentSection.innerHTML += `
    <div class="row mb-2">
    <div class="col-8">
      <div class="card">
        <div class="post-heading pl-2 pt-2">
          <div class="float-left meta">
            <div class="title h5">
              <h4 class="text-primary"><b>${localStorage.getItem('usuario')}</b></h4>

            </div>
            <h6 class="text-muted time">${date.getFullYear()+"-"+(date.getMonth() +1)+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()}</h6>
            <p><span class="badge badge-light" id="punctuationComment">${starSelected}</span></p>

          </div>
        </div>
        <div class="post-description pl-2 pr-2">
          <p>${commentInput.value}</p>
        </div>
      </div>
    </div>
  </div>
    `
  } else {
    alert("Debe ingresar un comentario")
  }
  starOne.style.color = 'black';
  starTwo.style.color = 'black';
  starThree.style.color = 'black';
  starFour.style.color = 'black';
  starFive.style.color = 'black';
}

//Función para que la calificación seleccionada se muestre en pantalla
//al momento de hacer un nuevo comentario.
function rateComment(){
  
  starOne.addEventListener('click', function () {
   starSelected = `<span class="fa fa-star checked"></span>
   <span class="fa fa-star"></span>
   <span class="fa fa-star"></span>
   <span class="fa fa-star"></span>
   <span class="fa fa-star"></span>`;
   this.style.color = 'rgb(189, 189, 19)'
   starTwo.style.color = 'black';
   starThree.style.color = 'black';
   starFour.style.color = 'black';
   starFive.style.color = 'black';
 });
 starTwo.addEventListener('click', function () {
   starSelected = `
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star"></span>
   <span class="fa fa-star"></span>
   <span class="fa fa-star"></span>`;
   starOne.style.color = 'rgb(189, 189, 19)';
   this.style.color = 'rgb(189, 189, 19)';
   starThree.style.color = 'black';
   starFour.style.color = 'black';
   starFive.style.color = 'black';
 });
 starThree.addEventListener('click', function () {
   starSelected = `
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star"></span>
   <span class="fa fa-star"></span>`;
   starOne.style.color = 'rgb(189, 189, 19)';
   starTwo.style.color = 'rgb(189, 189, 19)';
   this.style.color = 'rgb(189, 189, 19)';
   starFour.style.color = 'black';
   starFive.style.color = 'black';
 });
 starFour.addEventListener('click', function () {
   starSelected = `
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star"></span>`;
   starOne.style.color = 'rgb(189, 189, 19)';
   starTwo.style.color = 'rgb(189, 189, 19)'
   starThree.style.color = 'rgb(189, 189, 19)';
   this.style.color = 'rgb(189, 189, 19)'
   starFive.style.color = 'black';
 });
 starFive.addEventListener('click', function () {
   starSelected = `
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>
   <span class="fa fa-star checked"></span>`;
   starOne.style.color = 'rgb(189, 189, 19)';
   starTwo.style.color = 'rgb(189, 189, 19)'
   starThree.style.color = 'rgb(189, 189, 19)';
   starFour.style.color = 'rgb(189, 189, 19)';
   this.style.color = 'rgb(189, 189, 19)'
 }); 
 }
rateComment();



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productInformation = resultObj.data;
      // console.log(productInformation);
      //Muestro la información en product-info.html
      showProductInformation(productInformation);
      showRelated(productInformation.relatedProducts);
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (response) {
    if (response.status === "ok") {
      comments = response.data;
      showComments(comments);
    }
  });
  
  commentSend.addEventListener('click', addComment)
  $(function () {
    $('.carousel').carousel({
        interval: 1000
    })
  });
});
