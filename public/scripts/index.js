let viewAllProdcuts = async () => {
  try {
    let response = await fetchAllProducts();
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    handleProductsResponse(responseAsJson);
  } catch (error) {
    alert(error);
  }
};

viewAllProdcuts();

const handleProductsResponse = listOfProducts => {
  for (let i = 0; i < listOfProducts.length; i++) {
    let productObject = listOfProducts[i];
    let htmlElement = createHTMLElementForProduct(productObject);
    document.getElementById("productsContainer").appendChild(htmlElement);
  }
};

const createHTMLElementForProduct = product => {
  var productContainer = document.createElement("DIV");

  var nameTag = document.createElement("P");
  nameTag.innerHTML =
    product.name.charAt(0).toUpperCase() + product.name.slice(1);
  nameTag.className = "productName";
  productContainer.appendChild(nameTag);

  var imgTag = document.createElement("IMG");
  imgTag.src = product.imgURL;
  imgTag.className = "productImage";
  productContainer.appendChild(imgTag);

  var priceTag = document.createElement("P");
  priceTag.innerHTML = product.price + ":-";
  priceTag.className = "productPrice";
  productContainer.appendChild(priceTag);

  var addToCartTag = document.createElement("BUTTON");
  addToCartTag.addEventListener("click", async () => {
    const response = await addToCart(1, product.id);
    if (response.status === 403) {
      alert(await response.text());
    }
  });
  addToCartTag.innerHTML = "Add to cart";
  addToCartTag.className = "addToCartButton";
  productContainer.appendChild(addToCartTag);

  return productContainer;
};
