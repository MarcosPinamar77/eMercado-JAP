const previousPage = document.referrer;

if (!previousPage.includes('http://127.0.0.1:5500/login.html')) {
    window.location.href = 'login.html';
}

/*
const previousPag = document.referrer;
let prevUrl = document.referrer;
if(prevUrl.indexOf(window.location.host) !== -1) {
// Ir a la página anterior
window.history.back();
}
*/