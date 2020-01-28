const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

var cors = require("cors");
const express = require("express");
const app = express();

var bodyParser = require("body-parser");
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
// Set some defaults (required if your JSON file is empty)
db.defaults({
  products: [
    { id: 1, name: "shirt", price: "700sek", imgURL: "exempel.com" },
    { id: 2, name: "pants", price: "500sek", imgURL: "exempel.com" },
    { id: 3, name: "t-shirt", price: "300sek", imgURL: "exempel.com" },
    { id: 4, name: "skirt", price: "700sek", imgURL: "exempel.com" },
    { id: 5, name: "dress", price: "900sek", imgURL: "exempel.com" },
    { id: 6, name: "jumper", price: "700sek", imgURL: "exempel.com" },
    { id: 7, name: "cardigan", price: "700sek", imgURL: "exempel.com" },
    { id: 8, name: "jeans", price: "650sek", imgURL: "exempel.com" },
    { id: 9, name: "blouse", price: "550sek", imgURL: "exempel.com" },
    { id: 10, name: "socks", price: "100sek", imgURL: "exempel.com" }
  ],
  shoppingCarts: [{ id: 1, userId: 1, products: [] }]
}).write();

// posts product to cart
app.post("/cart/:cartId/products", (request, response) => {
  const productId = request.body.productId;
  const cartId = request.params.cartId;
  const product = db
    .get("products")
    .find({ id: parseInt(productId) })
    .value();

  // retrieves the right cart
  const cart = db
    .get("shoppingCarts")
    .find({ id: parseInt(cartId) })
    .value();

  // pushes new product to cart
  var currentProductsInCart = cart.products;
  currentProductsInCart.push(product);

  //adds products to cart by id
  db.get("shoppingCarts")
    .find({ id: cartId })
    .assign({ products: currentProductsInCart })
    .write();
  response.end(product.name + " was added to cart!");
});

// removes product from cart
app.delete("/cart/:cartId/products/:productId", (request, response) => {
  const productId = request.params.productId;
  const cartId = request.params.cartId;
  const cart = db
    .get("shoppingCarts")
    .find({ id: parseInt(cartId) })
    .value();
  var updatedProductsInCart = cart.products.filter(product => {
    return parseInt(productId) !== product.id;
  });

  db.get("shoppingCarts")
    .find({ id: parseInt(cartId) })
    .assign({ products: updatedProductsInCart })
    .write();

  response.send("product deleted from cart");
});

// Retrieves individual product by id
app.get("/products/:productId", (request, response) => {
  const productId = request.params.productId;
  const product = db
    .get("products")
    .find({ id: parseInt(productId) })
    .value();
  response.send(product);
});

// Lists all products from db
app.get("/products", (request, response) => {
  const products = db.get("products");
  response.send(products);
});

app.listen(port, () => {
  console.log("Starting server");
});
