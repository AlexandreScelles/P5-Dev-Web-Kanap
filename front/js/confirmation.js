// Récupération de orderId via l'URL transmise par cart.js
const params = new URLSearchParams(window.location.search);
const id = params.get("orderId");

// Ciblage et affichage de l'id de commande
document.getElementById('orderId').innerHTML = id