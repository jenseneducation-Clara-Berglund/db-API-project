const {
  getProductById,
  getCartById,
  getAllProducts,
  updateCartWithProducts
} = require("./dbModule");
var cors = require("cors");
const express = require("express");
const app = express();

var bodyParser = require("body-parser");
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
// Set some defaults (required if your JSON file is empty)

// posts product to cart
app.post("/cart/:cartId/products", (request, response) => {
  const productId = parseInt(request.body.productId);
  const cartId = parseInt(request.params.cartId);
  const product = getProductById(productId);
  const cart = getCartById(cartId);

  const productExists =
    cart.products.filter(product => product.id === productId).length > 0;
  if (productExists) {
    response.status(403).send("You already have that product!");
    return;
  }

  // pushes new product to cart
  var updatedProductsInCart = cart.products;
  updatedProductsInCart.push(product);

  //adds products to cart by id
  updateCartWithProducts(cartId, updatedProductsInCart);
  response.send(product.name + " was added to cart!");
});

// removes product from cart
app.delete("/cart/:cartId/products/:productId", (request, response) => {
  const productId = parseInt(request.params.productId);
  const cartId = parseInt(request.params.cartId);
  const cart = getCartById(cartId);
  const productDoesNotExist =
    cart.products.filter(product => product.id === productId).length === 0;
  if (productDoesNotExist) {
    response.status(404).send("Product does not exist");
    return;
  }
  var updatedProductsInCart = cart.products.filter(product => {
    return parseInt(productId) !== product.id;
  });

  updateCartWithProducts(cartId, updatedProductsInCart);
  response.send("product deleted from cart");
});

// Retrieves individual product by id
app.get("/products/:productId", (request, response) => {
  const productId = parseInt(request.params.productId);
  const product = getProductById(productId);
  response.send(product);
});

// Lists all products from db
app.get("/products", (request, response) => {
  const products = getAllProducts();
  response.send(products);
});

app.get("/cart/:cartId", (request, response) => {
  const cartId = parseInt(request.params.cartId);
  const cart = getCartById(cartId);
  response.send(cart);
});

app.listen(port, () => {
  console.log("Starting server");
});
