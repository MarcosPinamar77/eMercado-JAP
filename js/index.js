const previousPage = document.referrer;

//Tener en cuenta que si trabajo desde local host tengo que cambiar /eMercado-JAP/ por login.html
if (!previousPage.includes('/eMercado-JAP/')) {
    location.href = 'login.html';
}

/*
const previousPag = document.referrer;
let prevUrl = document.referrer;
if(prevUrl.indexOf(window.location.host) !== -1) {
// Ir a la página anterior
window.history.back();
}
*/