// Affichage de l'ID du produit dans l'URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Récupération des éléments HTML
const itemImg = document.querySelector(".item__img");
const titleElement = document.getElementById("title");
const priceElement = document.getElementById("price");
const descElement = document.getElementById("description");
const colorElement = document.getElementById("colors");
const addToCart = document.getElementById("addToCart");
const qtyInput = document.getElementById("quantity");
const colors = document.getElementById('colors');

// Appel a l'API pour afficher les produits correspondant a l'id
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


		// Ajout du produit selectionné dans le panier
		addToCart.addEventListener("click", function (e) {

			const color = document.querySelector("#colors").value;
			const qty = Number(document.querySelector("#quantity").value);
			const imgUrl = img.getAttribute("src", product.imageUrl);
			const imgAlt = img.getAttribute("alt", product.altTxt);
			// Validation du champ de la quantité et de la couleur
			if (color == "" || qty == "") {
				alert("Please select color and quantity");
			} else if (color != "" && qty <= 0 || qty > 100) {
				alert("Please select quantity");
			} else if (color == "" && qty >= 0) {
				alert("Please select color");
			} else {
				/**
				 * Création d'objet pour le LocalStorage
				 * @param {cartProduct}
				 * @param { String } product.name
				 * @param { String } product.description
				 * @param { String } product.id
				 * @param { String } color.value
				 * @param { Integer } qty.value
				 * @param { String } product.imgUrl
				 * @param { String } product.altTxt
				 */
				const cartProduct = {
					name: product.name,
					desc: product.description,
					id: id,
					color: color,
					quantity: Number(qty),
					imageUrl: imgUrl,
					altText: imgAlt,
				}
				/**
				Création et/ou Ajout d'objet dans le LocalStorage
				 * @param {Array{}} product
				 */
				function addProduct() {
					const storageProducts = JSON.parse(localStorage.getItem('product'))
					if (Array.isArray(storageProducts)) {
						const findProduct = storageProducts.find(product =>
							product.id === id &&
							product.color === color);
						if (!findProduct) {
							storageProducts.push(cartProduct)
						} else if (findProduct.quantity + qty > 100) {
							alert ('the maximum quantity is 100/item')
						} else {
							findProduct.quantity += qty;
						}
						localStorage.setItem('product', JSON.stringify(storageProducts));
					} else {
						localStorage.setItem('product', JSON.stringify([cartProduct]))
					}
				}
				addProduct()
			}
		})
	})