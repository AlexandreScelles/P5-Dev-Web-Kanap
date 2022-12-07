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



		});
		itemImg.appendChild(img);

		addToCart.addEventListener("click", function (e) {

			const color = document.querySelector("#colors").value;
			const qty = document.querySelector("#quantity").value;
			const imgUrl = img.getAttribute("src", product.imageUrl);
			const imgAlt = img.getAttribute("alt", product.altTxt);
			if (color == "" || qty == "") {
				alert("Please select color and quantity");
			}
			const cartProduct = {
				name: product.name,
				desc: product.description,
				id: id,
				color: color,
				quantity: Number(qty),
				imageUrl: imgUrl,
				altText: imgAlt,
			}
			console.log(localStorage);
			const storageProducts = JSON.parse(localStorage.getItem('product'))
				if (Array.isArray(storageProducts)) {
					storageProducts.push(cartProduct)
					localStorage.setItem('product', JSON.stringify(storageProducts));
				}else {
					localStorage.setItem('product', JSON.stringify([cartProduct]))
				}
		});
	});