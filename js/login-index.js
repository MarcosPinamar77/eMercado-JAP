const previousPage = document.referrer;

//Tener en cuenta que si trabajo desde github tengo que cambiar /eMercado-JAP/ por login.html
if (!previousPage.includes('product-info.html') && !previousPage.includes('category-info.html') && !previousPage.includes('my-profile.html') && !previousPage.includes('login.html') && !previousPage.includes('categories.html') && !previousPage.includes('cart.html') && !previousPage.includes('sell.html') && !previousPage.includes('products.html') && !previousPage.includes('index.html')) {
    location.href = 'login.html';
}

