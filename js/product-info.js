//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productName  = document.getElementById("productName");
let productDescription = document.getElementById("productDescription");
let price = document.getElementById("price");
let category = document.getElementById("category");
let imageContainer = document.getElementById('productImagesGallery');
let vendidos = document.getElementById('soldCount');
let commentSection = document.getElementById('comment-section');
let commentInput = document.getElementById('comment-input');
let commentSend = document.getElementById('comment-send');
let starOne = document.getElementById('starOne');
let starTwo = document.getElementById('starTwo');
let starThree = document.getElementById('starThree');
let starFour = document.getElementById('starFour');
let starFive = document.getElementById('starFive');
let starSelected;
starOne.addEventListener('click', function(){
  starSelected = 1;
  this.style.color = 'rgb(189, 189, 19)'
  starTwo.style.color = 'black';
  starThree.style.color = 'black';
  starFour.style.color = 'black';
  starFive.style.color = 'black';
});

starTwo.addEventListener('click', function(){
  starSelected = 2;
  starOne.style.color = 'rgb(189, 189, 19)';
  this.style.color = 'rgb(189, 189, 19)';
  starThree.style.color = 'black';
  starFour.style.color = 'black';
  starFive.style.color = 'black';
});
starThree.addEventListener('click', function(){
  starSelected = 3;
  starOne.style.color = 'rgb(189, 189, 19)';
  starTwo.style.color = 'rgb(189, 189, 19)';
  this.style.color = 'rgb(189, 189, 19)';
  starFour.style.color = 'black';
  starFive.style.color = 'black';
});
starFour.addEventListener('click', function(){
  starSelected = 4;
  starOne.style.color = 'rgb(189, 189, 19)';
  starTwo.style.color = 'rgb(189, 189, 19)'
  starThree.style.color = 'rgb(189, 189, 19)';
  this.style.color = 'rgb(189, 189, 19)'
  starFive.style.color = 'black';
});
starFive.addEventListener('click', function(){
  starSelected = 5;
  starOne.style.color = 'rgb(189, 189, 19)';
  starTwo.style.color = 'rgb(189, 189, 19)'
  starThree.style.color = 'rgb(189, 189, 19)';
  starFour.style.color = 'rgb(189, 189, 19)';
  this.style.color = 'rgb(189, 189, 19)'
});



//localStorage.getItem('usuario');
function addComment(){
  if(commentInput.value != 0){
    commentSection.innerHTML += `
    <div class="row mb-2">
    <div class="col-8">
      <div class="card">
        <div class="post-heading pl-2 pt-2">
          <div class="float-left meta">
            <div class="title h5">
              <h4 class="text-primary"><b>${localStorage.getItem('usuario')}</b></h4>

            </div>
            <h6 class="text-muted time">15/15/15</h6>
            <p><span class="badge badge-warning" id="punctuationComment">Puntuación ${starSelected}</span></p>

          </div>
        </div>
        <div class="post-description pl-2 pr-2">
          <p>${commentInput.value}</p>
        </div>
      </div>
    </div>
  </div>
    `  
  }
  starOne.style.color = 'black';
  starTwo.style.color = 'black';
  starThree.style.color = 'black';
  starFour.style.color = 'black';
  starFive.style.color = 'black';
}

function showProductInformation(array){
    productName.innerHTML += array.name;
    productDescription.innerHTML += array.description;
    price.innerHTML += array.cost + " " + array.currency;
    category.innerHTML += array.category;
    vendidos.innerHTML += array.soldCount;
    
    
        for(item in array.images){
           imageContainer.innerHTML +=`
           <div class="col-lg-2 col-md-4 col-2">
                <div class="d-block mb-4 h-100">
                    <img class="img-fluid img-thumbnail" src="${array.images[item]}" alt="">
                </div>
            </div>
           ` 
        }
    
};

function showComments(array){
    for(random in array){
      console.log(array[random].score)
    }
    for(item in array){
        
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
                <p><span class="badge badge-warning" id="scoreComment">Puntuacion ${array[item].score}</span></p>

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

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           productInformation = resultObj.data;
          // console.log(productInformation);
            //Muestro la información en product-info.html
            showProductInformation(productInformation); 
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(response){
        if(response.status === "ok"){
            comments = response.data;
            console.log(comments);
            showComments(comments);
        }
    });
    commentSend.addEventListener('click', addComment)
});