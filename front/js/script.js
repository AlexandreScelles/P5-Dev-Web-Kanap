const sectionProduct = document.getElementById("items");


fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(products) {
	products.forEach(product => {
		const a = document.createElement("a");
		const article = document.createElement("article");
		const img = document.createElement("img");
		const title = document.createElement("h3");
		const desc = document.createElement("p");

		a.setAttribute("href", `./product.html?id=${product._id}`);
		img.setAttribute("src", product.imageUrl);
		img.setAttribute("alt", product.altTxt);
		title.textContent = product.name;
		title.className = "productName";
		desc.textContent = product.description;
		desc.className = "productDescription";

		a.appendChild(article);
		article.append(img, title, desc);
		sectionProduct.appendChild(a);
	});
  });
