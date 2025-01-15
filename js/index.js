// Product Data
const data = {
  products: [
    {
      id: 1,
      name: "MacBook",
      image: "../public/image1.jpg",
      price: 100,
      category: "Electronics",
      description: "A MacBook Pro",
    },
    {
      id: 2,
      name: "HP Elite Book",
      image: "../public/image2.jpg",
      price: 150,
      category: "Electronics",
      description: "A high-end laptop",
    },
    {
      id: 3,
      name: "Sneakers",
      image: "../public/image3.jpg",
      price: 50,
      category: "Fashion",
      description: "Comfortable sneakers for everyday wear",
    },
    {
      id: 4,
      name: "Chair",
      image: "../public/image4.jpg",
      price: 200,
      category: "Furniture",
      description: "Ergonomic office chair",
    },
  ],
};



// Function to populate category filter options
function populateCategories() {
  const categories = [
    "All", 
    ...new Set(data.products.map((product) => product.category)),
  ];
  const categoryFilter = document.getElementById("category-filter");
  
  // Add each category as an option in the category filter
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Event listener for category filter to display products based on selected category
document
  .getElementById("category-filter")
  .addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts =
      selectedCategory === "All"
        ? data.products
        : data.products.filter(
            (product) => product.category === selectedCategory
          );
    listProducts(filteredProducts); // Display filtered products
  });

// Event listener for search functionality
document.getElementById("search-bar").addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase();
  const filteredProducts = data.products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
  );
  listProducts(filteredProducts); // Display filtered products
});


// Function to display products on the page
function listProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear the container before displaying new products

  // Display each product
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" />
      <p>$${product.price}</p>
       <button onclick="addToCart(${product.id})">Add to Cart</button>
      <button onclick="showDetails(${product.id})">View Details</button>
    `;
    container.appendChild(productDiv);
  });
}


// Cart array to store cart items
let cart = [];

// function to add a product to the cart
function addToCart(productId) {
  const product = data.products.find((p) => p.id === productId);
  const existingProduct = cart.find((item) => item.id === productId);

  // If product already exists in cart, increase quantity
  if (existingProduct) {
    existingProduct.quantity += 1;
    existingProduct.total = existingProduct.quantity * product.price;
  } else {
    // If new product, add to cart with quantity of 1
    cart.push({ ...product, quantity: 1, total: product.price });
  }

  updateCart(); // Update the cart view

  // uppdating the details modal dynamically if it's open
  const detailsContainer = document.getElementById("product-details");
  if (detailsContainer && !document.getElementById("details-modal").classList.contains("hidden")) {
    const quantity = existingProduct ? existingProduct.quantity : 1;
    const total = quantity * product.price;

    detailsContainer.querySelector(".product-quantity").textContent = `Quantity in Cart: ${quantity}`;
    detailsContainer.querySelector(".product-total").textContent = `Total: $${total}`;
  }
}


// Function to show product details in a modal
function showDetails(productId) {
  const product = data.products.find((p) => p.id === productId);
  const modal = document.getElementById("details-modal");
  const detailsContainer = document.getElementById("product-details");

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.id === productId);
  const quantity = existingProduct ? existingProduct.quantity : 0;
  const total = quantity * product.price;

  // Set content of the product details modal
  detailsContainer.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}" />
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <p class="product-quantity">Quantity in Cart: ${quantity}</p>
    <p class="product-total">Total: $${total}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
    <button onclick="closeDetailsModal()">Close</button>
  `;

  modal.classList.remove("hidden"); // Show the modal
}


function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = ""; // Clear the cart list


  cart.forEach((item, index) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      ${item.name} (x${item.quantity}) - $${item.total}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });

    const totalPrice = cart.reduce((sum, item) => sum + item.total, 0);
  document.getElementById("total-price").textContent = totalPrice;
}



// Function to close the product details modal
function closeDetailsModal() {
  document.getElementById("details-modal").classList.add("hidden");
}

// Cart Modal functionality
document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart-modal").classList.remove("hidden");
});

// Close cart modal
function closeCartModal() {
  document.getElementById("cart-modal").classList.add("hidden");
}

// Checkout Modal functionality
document.getElementById("checkout-button").addEventListener("click", showCheckoutModal);

// Function to show the checkout modal
function showCheckoutModal() {
  document.getElementById("checkout-modal").classList.remove("hidden");
}

// Close checkout modal
function closeCheckoutModal() {
  document.getElementById("checkout-modal").classList.add("hidden");
}

// Event listener for checkout form submission
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order submitted successfully!"); // Alert user on successful submission
  closeCheckoutModal();
  cart = []; // Clear the cart
  updateCart(); // Update the cart view
});


// Initialize the page with categories and products
populateCategories();
listProducts(data.products);
