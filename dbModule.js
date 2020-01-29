const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

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

module.exports = {
  getProductById: id => {
    const product = db
      .get("products")
      .find({ id: id })
      .value();
    return product;
  },

  // retrieves the right cart
  getCartById: id => {
    const cart = db
      .get("shoppingCarts")
      .find({ id: id })
      .value();
    return cart;
  },

  getAllProducts: () => {
    const products = db.get("products");
    return products;
  },

  updateCartWithProducts: (id, products) => {
    db.get("shoppingCarts")
      .find({ id: id })
      .assign({ products: products })
      .write();
  }
};
