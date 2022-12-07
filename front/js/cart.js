const cartItems = document.getElementById("cart__items");

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

function createDescProduct(product) {
	const divItemContentDesc = document.createElement("div");
	const productName = document.createElement("h2");
	const colorChoice = document.createElement("p");
	const productPrice = document.createElement("p");
	divItemContentDesc.className = "cart__item__content__description";
	productName.textContent = product.name;
	colorChoice.textContent = product.color;
	productPrice.textContent = product.price;
	divItemContentDesc.append(productName, colorChoice, productPrice);
	return divItemContentDesc;
}

function createSettingsQuantityProduct(product) {
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
	chooseNumberOfQuantity.addEventListener('change', function(e){
		const article = chooseNumberOfQuantity.closest('article');
		const dataId = article.getAttribute('data-id');
		const dataColor = article.getAttribute('data-color');
		const products = JSON.parse(localStorage.getItem('product'));
		const productIndex = products.findIndex(function(product, i){
			return product.id === dataId && product.color === dataColor;
		})
		if (chooseNumberOfQuantity.value < 1){
			chooseNumberOfQuantity.value = 1
		}else if (chooseNumberOfQuantity.value > 100){
			chooseNumberOfQuantity.value = 100
		}
		products[productIndex].quantity = e.target.value;
		console.log(products[productIndex].quantity);
		localStorage.setItem('product', JSON.stringify(products));
	})
	divItemContentSettingsQty.append(numberOfQuantity, chooseNumberOfQuantity);
	return divItemContentSettingsQty;
}


function createSettingsDelProduct() {
	const divItemContentSettingsDel = document.createElement("div");
	divItemContentSettingsDel.className = "cart__item__content__settings_delete";
	const delProduct = document.createElement('p');
	delProduct.className = 'deleteItem';
	delProduct.textContent = 'Supprimer';
	delProduct.addEventListener('click', function(e){
		const article = delProduct.closest('article');
		const dataId = article.getAttribute('data-id');
		const dataColor = article.getAttribute('data-color');
		const products = JSON.parse(localStorage.getItem('product'));
		const productIndex = products.findIndex(function(product, i){
			return product.id === dataId && product.color === dataColor;
		})
		products.splice(productIndex,1);
		localStorage.setItem('product', JSON.stringify(products));
		article.remove();
	})
	divItemContentSettingsDel.appendChild(delProduct);
	return divItemContentSettingsDel;
}


function createSettingsProduct(product) {
	const divItemContentSettings = document.createElement("div");
	divItemContentSettings.className = "cart__item__content__settings";
	divItemContentSettings.append(createSettingsQuantityProduct(product), createSettingsDelProduct(product));
	return divItemContentSettings;
}

function createItemContentProduct(product) {
	const divItemContent = document.createElement("div");
	divItemContent.className = "cart__item__content";
	divItemContent.appendChild(createDescProduct(product));
	return divItemContent;
}

function listOfItems() {
	const storageProducts = JSON.parse(localStorage.getItem('product'))
	storageProducts.forEach(product => {
		const article = document.createElement("article");
		article.className = "cart__item";
		article.setAttribute('data-id', product.id);
		article.setAttribute('data-color', product.color);
		article.append(
			createImageProduct(product),
			createItemContentProduct(product),
			createSettingsProduct(product),
		);
		cartItems.appendChild(article);
	});
};

listOfItems()