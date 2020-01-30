const baseUrl = "http://127.0.0.1:8000";

const fetchAllProducts = () => {
  return fetch(`${baseUrl}/products`);
};

const fetchProduct = productId => {
  return fetch(`${baseUrl}/products/${productId}`);
};

const fetchCart = cartId => {
  return fetch(`${baseUrl}/cart/${cartId}`);
};

const removeFromCart = (cartId, productId) => {
  return fetch(`${baseUrl}/cart/${cartId}/products/${productId}`);
};

const addToCart = (cartId, productId) => {
  const data = { productId: productId };
  return fetch(`${baseUrl}/cart/${cartId}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
};
