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
  productContainer.className = "productContainer";

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

// access cart

let viewCart = async () => {
  try {
    let response = await fetchCart(1);
    let responseAsJson = await response.json();
    console.log(responseAsJson);
    handleCartResponse(responseAsJson);
  } catch (error) {
    alert(error);
  }
};

viewCart();

const handleCartResponse = cartObject => {
  for (let i = 0; i < cartObject.products.length; i++) {
    let cartProduct = cartObject.products[i];
    let htmlElement = createHTMLElementForCartProduct(cartProduct);
    document.getElementById("cartItemsContainer").appendChild(htmlElement);
  }
};

const createHTMLElementForCartProduct = cartProduct => {
  var cartItemsContainer = document.createElement("DIV");

  var nameTag = document.createElement("P");
  nameTag.innerHTML =
    cartProduct.name.charAt(0).toUpperCase() + cartProduct.name.slice(1);
  nameTag.className = "cartProductName";
  cartItemsContainer.appendChild(nameTag);

  var imgTag = document.createElement("IMG");
  imgTag.src = cartProduct.imgURL;
  imgTag.className = "cartProductImage";
  cartItemsContainer.appendChild(imgTag);

  var priceTag = document.createElement("P");
  priceTag.innerHTML = cartProduct.price + ":-";
  priceTag.className = "cartProductPrice";
  cartItemsContainer.appendChild(priceTag);

  var removeFromCartTag = document.createElement("BUTTON");
  removeFromCartTag.addEventListener("click", async () => {
    await removeFromCart(1, cartProduct.id);
    await viewCart();
  });
  removeFromCartTag.innerHTML = "Remove from cart";
  removeFromCartTag.className = "removeFromCartButton";
  cartItemsContainer.appendChild(removeFromCartTag);

  return cartItemsContainer;
};
