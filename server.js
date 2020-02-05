const cors = require("cors");
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const {
  getProductById,
  getCartById,
  getAllProducts,
  updateCartWithProducts
} = require("./dbModule");

const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
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

  const productDoesNotExistInDb =
    getAllProducts().filter(product => product.id === productId).length === 0;
  if (productDoesNotExistInDb) {
    response.status(404).send("product does not exist");
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
    response.status(404).send("Product does not exist in cart");
    return;
  }
  var updatedProductsInCart = cart.products.filter(product => {
    return parseInt(productId) !== product.id;
  });

  updateCartWithProducts(cartId, updatedProductsInCart);
  response.send("product deleted from cart");
});

// Retrives cart by id
app.get("/cart/:cartId", (request, response) => {
  const cartId = parseInt(request.params.cartId);
  const cart = getCartById(cartId);
  response.send(cart);
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

app.listen(port, () => {
  console.log("Starting server");
});
