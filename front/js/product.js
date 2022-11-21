const params = new URLSearchParams(window.location.search);
const itemImg = document.querySelector(".item__img");
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descElement = document.getElementById("description");
const colorElement = document.getElementById("colors");

fetch(`http://localhost:3000/api/products/${params.get("id")}`)
	.then(function(res){
		if (res.ok){
			return res.json();
		}
	})
	.then(function(product){
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
	});
