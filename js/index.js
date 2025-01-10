const data = {
  products: [
    {
      id: 1,
      name: "Laptop",
      image: "../public/image1.jpg",
      price: 100,
      description: "A MacBook Pro",
    },
    {
      id: 2,
      name: "Laptop",
      image: "../public/image2.jpg",
      price: 150,
      description: "A high-end laptop",
    },
    {
      id: 3,
      name: "Laptop",
      image: "../public/image3.jpg",
      price: 200,
      description: "An ultra-light laptop",
    },
    {
      id: 4,
      name: "Laptop",
      image: "../public/image4.jpg",
      price: 200,
      description: "An ultra-light laptop",
    },
    {
      id: 5,
      name: "Laptop",
      image: "../public/image5.jpg",
      price: 200,
      description: "An ultra-light laptop",
    },
  ],
};

let cart = [];
const container = document.getElementById("product-container");
const cartItems = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
function listProducts() {
  data.products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}"  />
    <p>Price: $${product.price}</p>
    <p>${product.description}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>

    `;

    container.appendChild(productDiv);
  });
}

function addToCart(productId) {
  const product = data.products.find((p) => p.id === productId);
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      ${item.name} - $${item.price}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  totalPriceEl.textContent = totalPrice;
}

listProducts();
