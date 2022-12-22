const params = new URLSearchParams(window.location.search);
const id = params.get("orderId");

document.getElementById('orderId').innerHTML = id