const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({
  products: [
    {
      id: 1,
      name: "shirt",
      price: "700sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2015/09/02/13/18/person-918986__480.jpg"
    },
    {
      id: 2,
      name: "pants",
      price: "500sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2020/01/22/15/10/fashion-4785524__480.jpg"
    },
    {
      id: 3,
      name: "t-shirt",
      price: "300sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2016/03/25/09/04/t-shirt-1278404_1280.jpg"
    },
    {
      id: 4,
      name: "skirt",
      price: "700sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2020/01/11/11/08/skirt-4757226_1280.jpg"
    },
    {
      id: 5,
      name: "dress",
      price: "900sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2018/01/11/09/39/woman-3075704_1280.jpg"
    },
    {
      id: 6,
      name: "jumper",
      price: "700sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2016/03/27/19/31/fashion-1283863_1280.jpg"
    },
    {
      id: 7,
      name: "cardigan",
      price: "700sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2020/01/22/15/10/cardigan-4785525__480.jpg"
    },
    {
      id: 8,
      name: "jeans",
      price: "650sek",
      imgURL:
        "ehttps://cdn.pixabay.com/photo/2015/09/05/21/57/girl-925635__480.jpg"
    },
    {
      id: 9,
      name: "blouse",
      price: "550sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2016/04/19/16/28/model-1338993__480.jpg"
    },
    {
      id: 10,
      name: "socks",
      price: "100sek",
      imgURL:
        "https://cdn.pixabay.com/photo/2016/07/04/04/32/sock-1495920__480.jpg"
    }
  ],
  shoppingCarts: [{ id: 1, userId: 1, products: [] }]
}).write();

module.exports = {
  getAllProducts: () => {
    const products = db.get("products").value();
    return products;
  },

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

  updateCartWithProducts: (id, products) => {
    db.get("shoppingCarts")
      .find({ id: id })
      .assign({ products: products })
      .write();
  }
};
