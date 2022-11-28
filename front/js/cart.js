const cartItems = document.getElementById("cart__items");
const article = document.createElement("article");
const divItemImg = document.createElement("div");
const divItemContent = document.createElement("div");
const divItemContentDesc = document.createElement("div");
const divItemContentSettings = document.createElement("div");
const divItemContentSettingsQty = document.createElement("div");
const divItemContentSettingsDel = document.createElement("div");

const img = document.createElement("img");
const altTxt = document.createElement("alt");
divItemImg.append(img, altTxt);

const productName = document.createElement("h2");
const colorChoice = document.createElement("p");
const productPrice = document.createElement("p");
divItemContentDesc.append(productName, colorChoice, productPrice);

const numberOfQuantity = document.createElement("p");
const chooseNumberOfQuantity = document.createElement("imput");
divItemContentSettingsQty.append(numberOfQuantity, chooseNumberOfQuantity);



article.className = "cart__item";
divItemImg.className = "cart__item__img";
divItemContent.className = "cart__item__content";
divItemContentDesc.className = "cart__item__content__description";
divItemContentSettings.className = "cart__item__content__settings";
divItemContentSettingsQty.className = "cart__item__content__settings__quantity";
divItemContentSettingsDel.className = "cart__item__content__settings_delete";

divItemContent.appendChild(divItemContentDesc);
divItemContentSettings.append(divItemContentSettingsQty, divItemContentSettingsDel);
article.append(divItemImg, divItemContent, divItemContentSettings);
cartItems.appendChild(article);

const cart = [];

function listOfItems() {
	const numberOfProducts = localStorage.length;
	for (let i = 0; i < numberOfProducts; i++) {
		const item = localStorage.getItem(localStorage.key(i))
		const local = JSON.parse(localStorage.getItem(item));
		cart.push(local);
		console.log(cart)
	}
}
listOfItems()

//const local = JSON.parse(localStorage.getItem(id));