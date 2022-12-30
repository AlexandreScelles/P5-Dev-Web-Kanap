const cartItems = document.getElementById("cart__items");
const totalPriceElement = document.querySelector('#totalPrice');

/**
 * Regrouper les articles similaires par couleurs
 * @param {Array} product
 */
function addOtherProduct() {
	const products = JSON.parse(localStorage.getItem('product'))
	const addQuantity = products.find()
}





/**
 * Création élément HTML pour l'affichage de l'image d'un produit
 * @param {Array{}} product
 * @returns Div Item Image
 */
function createImageProduct(product) {
	const divItemImg = document.createElement("div");
	const img = document.createElement("img");
	const altTxt = document.createElement("alt");
	divItemImg.className = "cart__item__img";
	divItemImg.append(img, altTxt);
	img.setAttribute('src', product.imageUrl);
	altTxt.setAttribute('alt', product.altText);
	return divItemImg;
}
/**
 * Création élément HTML pour la descritpion d'un produit
 * @param {Array{}} product
 * @returns Div Item Content Description
 */
function createDescProduct(product) {
	const divItemContentDesc = document.createElement("div");
	const productName = document.createElement("h2");
	const colorChoice = document.createElement("p");
	const productPrice = document.createElement("p");
	divItemContentDesc.className = "cart__item__content__description";
	// Utilisation de {product} pour compléter les champs 'name', 'color' et 'price'
	productName.textContent = product.name;
	colorChoice.textContent = product.color;
	productPrice.textContent = product.price;
	divItemContentDesc.append(productName, colorChoice, productPrice);
	return divItemContentDesc;
}
/**
 * Détermine la quantité de chaque produit dans le panier
 * @param {Array{}} product
 * @param {Array} productsWithPrice
 * @returns Div Item Content Settings Quantity
 */
function createSettingsQuantityProduct(product, productsWithPrice) {
	const divItemContentSettingsQty = document.createElement("div");
	const numberOfQuantity = document.createElement("p");
	const chooseNumberOfQuantity = document.createElement("input");
	divItemContentSettingsQty.className = "cart__item__content__settings__quantity";
	numberOfQuantity.textContent = "Qté :";
	chooseNumberOfQuantity.setAttribute("type", 'number');
	chooseNumberOfQuantity.setAttribute('min', '1');
	chooseNumberOfQuantity.setAttribute('max', '100');
	chooseNumberOfQuantity.className = "itemQuantity";
	chooseNumberOfQuantity.value = product.quantity;

	chooseNumberOfQuantity.addEventListener('change', function (e) {
		const article = chooseNumberOfQuantity.closest('article');
		const dataId = article.getAttribute('data-id');
		const dataColor = article.getAttribute('data-color');
		const products = JSON.parse(localStorage.getItem('product'));


		// Vérifie la concordance de chaque produit avec son id et sa couleur pour pouvoir en modifier la quantité
		const productIndex = products.findIndex(function (product) {
			return product.id === dataId && product.color === dataColor;
		})
		const quantity = Number(chooseNumberOfQuantity.value)
		if (quantity < 1) {
			chooseNumberOfQuantity.value = 1
		} else if (quantity > 100) {
			chooseNumberOfQuantity.value = 100
		}
		products[productIndex].quantity = quantity;

		const productPriceIndex = productsWithPrice.findIndex(function (product) {
			return product.id === dataId && product.color === dataColor;
		})

		// Ajustement du prix total par nombre d'article présent dans le panier
		productsWithPrice[productPriceIndex].quantity = quantity;

		localStorage.setItem('product', JSON.stringify(products));
		totalQuantity();
		totalPrice(productsWithPrice);
	})
	divItemContentSettingsQty.append(numberOfQuantity, chooseNumberOfQuantity);
	return divItemContentSettingsQty;
}

/**
 * Permet de supprimer un article et sa quantité du panier
 * @param {Array{}} product
 * @param {Array} productsWithPrice
 * @returns Div Item Content Settings Delete
 */
function createSettingsDelProduct(product, productsWithPrice) {
	const divItemContentSettingsDel = document.createElement("div");
	divItemContentSettingsDel.className = "cart__item__content__settings_delete";
	const delProduct = document.createElement('p');
	delProduct.className = 'deleteItem';
	delProduct.textContent = 'Supprimer';
	delProduct.addEventListener('click', function () {
		const article = delProduct.closest('article');
		const dataId = article.getAttribute('data-id');
		const dataColor = article.getAttribute('data-color');
		const products = JSON.parse(localStorage.getItem('product'));
		const productIndex = products.findIndex(function (product) {
			return product.id === dataId && product.color === dataColor;
		});
		products.splice(productIndex, 1);
		const reducePrice = productsWithPrice.findIndex(function (product) {
			return product.id === dataId && product.color === dataColor;
		})
		productsWithPrice.splice(reducePrice, 1)
		localStorage.setItem('product', JSON.stringify(products));
		article.remove();
		totalQuantity(product);
		totalPrice(productsWithPrice);
	})
	divItemContentSettingsDel.appendChild(delProduct);
	return divItemContentSettingsDel;
}

/**
 * Création d'une Div qui conteint Div Settings Quantity et Div Settings Delete
 * @param {Array{}} product
 * @param {Array} productsWithPrice
 * @returns Div Item Content Settings
 */
function createSettingsProduct(product, productsWithPrice) {
	const divItemContentSettings = document.createElement("div");
	divItemContentSettings.className = "cart__item__content__settings";
	divItemContentSettings.append(createSettingsQuantityProduct(product, productsWithPrice), createSettingsDelProduct(product, productsWithPrice));
	return divItemContentSettings;
}
/**
 * Création d'une Div qui contient la div CreateDescProduct
 * @param {Array{}} product
 * @returns Div Item Content
 */
function createItemContentProduct(product) {
	const divItemContent = document.createElement("div");
	divItemContent.className = "cart__item__content";
	divItemContent.appendChild(createDescProduct(product));
	return divItemContent;
}
/**
 * Utilisation de la méthode reduce() pour avoir la quantité total de produits présent dans le panier
 */
function totalQuantity() {
	const quantityElement = document.getElementById('totalQuantity');
	const products = JSON.parse(localStorage.getItem('product'));
	const totalQuantity = products.reduce(
		(accumulator, product) => accumulator + product.quantity, 0
	);
	quantityElement.innerHTML = totalQuantity;
}
/**
 * Utilisation de la méthode reduce() pour avoir le prix total du panier
 * @param {Array} productsWithPrice
 */
function totalPrice(productsWithPrice) {
	const totalPrice = productsWithPrice.reduce((acc, product) => acc + product.quantity * product.price, 0);
	totalPriceElement.innerHTML = totalPrice
};
/**
 * Création de la liste des articles regroupés par leur id et color présent dans le panier
 * @param {Array} productsWithPrice
 */
function listOfItems(productsWithPrice) {
	const storageProducts = JSON.parse(localStorage.getItem('product'));
	storageProducts.forEach(product => {
		const article = document.createElement("article");
		article.className = "cart__item";
		article.setAttribute('data-id', product.id);
		article.setAttribute('data-color', product.color);
		article.append(
			createImageProduct(product),
			createItemContentProduct(product),
			createSettingsProduct(product, productsWithPrice),
		);
		cartItems.appendChild(article);
	});
}
/**
 * Validation des champs du formulaire via les Regex
 */
function form() {
	const validators = [{
		// Regex pour les champs qui n'autorisent pas les chiffres
			regex: /^[A-Za-zÀ-ÖØ-öø-ÿ]*([-]{1})?[A-Za-zÀ-ÖØ-öø-ÿ]*?[A-Za-zÀ-ÖØ-öø-ÿ]+$/g,
			elements: [{
					input: document.getElementById('firstName'),
					errorDiv: document.getElementById('firstNameErrorMsg'),
				},
				{
					input: document.getElementById('lastName'),
					errorDiv: document.getElementById('lastNameErrorMsg'),
				},
				{
					input: document.getElementById('city'),
					errorDiv: document.getElementById('cityErrorMsg'),
				},
			]
		},
		{
			regex: /[A-Za-zÀ-ÖØ-öø-ÿ\'0-9\t]/g,
			elements: [{
				input: document.getElementById('address'),
				errorDiv: document.getElementById('addressErrorMsg'),
			}, ]
		},
		{
			// Regex pour adresse email d'une longueur max de 63 caractères
			regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/g,
			elements: [{
				input: document.getElementById('email'),
				errorDiv: document.getElementById('emailErrorMsg'),
			}, ]
		}
	]
	// Test de validation des champs
	validators.forEach(validator => {
		validator.elements.forEach(element => {
			element.input.addEventListener('change', function () {
				const valRegex = validator.regex.test(element.input.value)
				if (!valRegex) {
					element.errorDiv.innerHTML = 'champ mal renseigné'
				} else {
					element.errorDiv.innerHTML = '';
				}
			})
		})
		return validators
	});
}
/**
 * Appel à l'API pour récupérer le prix de chaque produit
 */
fetch('http://localhost:3000/api/products/')
	.then(function (res) {
		if (res.ok) {
			return res.json()
		}
	})
	.then(
		/**
		 *
		 * @param {object[]} products
		 */
		function (products) {
			const storageProducts = JSON.parse(localStorage.getItem('product'));
			if (storageProducts === null) {
				return totalPriceElement.innerHTML = 0
			} else {
				const productsWithPrice = storageProducts.map(product => {
					const id = product.id;
					const productPrice = products.find(function (apiProduct) {
						return id === apiProduct._id
					}).price
					return {
						...product,
						price: Number(productPrice)
					}
				});
				totalPrice(productsWithPrice);
				listOfItems(productsWithPrice);
				totalQuantity();
			};
		});

// Compilation des données à transmettre à l'API
function preOrder() {
	const form = document.querySelector('.cart__order__form')
	form.addEventListener('submit', function order(e) {
		e.preventDefault();
		const storageProducts = JSON.parse(localStorage.getItem('product'));
		const products = storageProducts.map(product => {
			const idProduct = product.id
			return idProduct
		})
		const contact = {
			firstName: firstName.value,
			lastName: lastName.value,
			address: address.value,
			city: city.value,
			email: email.value,
		}
		fetchOrder(products, contact);
		return products
	});
};
/**
 * Appel à l'API de manière asynchrone pour obtenir un orderID
 * @param {Array{}} products
 * @param {Object} contact
 */
async function fetchOrder(products, contact) {
	const res = await fetch(`http://localhost:3000/api/products/order`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				contact,
				products
			}),
		}, )
		.then(function (res) {
			if (res.ok === true) {
				return res.json();
			}
		})
		// Redirection vers la page Confirmation avec l'orderID dans l'url
		.then(function (data) {
			const orderId = data.orderId;
			window.location.href = `../html/confirmation.html?orderId=${orderId}`
		})
		// Suppression du localStorage
		.then(function () {
			localStorage.clear();
		})
};
form();
preOrder();