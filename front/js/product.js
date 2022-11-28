const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const itemImg = document.querySelector(".item__img");
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descElement = document.getElementById("description");
const colorElement = document.getElementById("colors");
const addToCart = document.getElementById("addToCart");
const qtyInput = document.getElementById("quantity");
const colors = document.getElementById('colors');


fetch(`http://localhost:3000/api/products/${id}`)
	.then(function (res) {
		if (res.ok) {
			return res.json();
		}
	})
	.then(function (product) {
		const img = document.createElement("img");
		img.setAttribute("src", product.imageUrl);
		img.setAttribute("alt", product.altTxt);

		titleElement.textContent = product.name;
		priceElement.textContent = product.price;
		descElement.textContent = product.description;

		product.colors.forEach(color => {
			const option = document.createElement("option");
			option.setAttribute("value", color);
			option.textContent = color;
			colorElement.appendChild(option);


			itemImg.appendChild(img);

			addToCart.addEventListener("click", function (e) {
				currentProduct = product;
				const color = document.querySelector("#colors").value
				const qty = document.querySelector("#quantity").value
				if (color == "" || qty == "") {
					alert("Please select color and quantity")
				}
				const cartProduct = {
					id: id,
					color: color,
					quantity: Number(qty),
				}
				localStorage.setItem(id, JSON.stringify(cartProduct));
				console.log(localStorage);
			});
		});
	});