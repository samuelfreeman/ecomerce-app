// Product Data
const data = {
  products: JSON.parse(localStorage.getItem("products")) || [
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
    {
      id: 5,
      name: "Chair",
      image: "../public/chair3.jpg",
      price: 350,
      category: "Furniture",
      description: "Ergonomic office chair",
    },
    {
      id: 6,
      name: "Chair",
      image: "../public/image4.jpg",
      price: 200,
      category: "Furniture",
      description: "Ergonomic office chair",
    },
    {
      id: 7,
      name: "Headphones",
      image: "../public/headphones1.jpg",
      price: 200,
      category: "Electronics",
      description: "Cheap headphones",
    },
    {
      id: 8,
      name: "Headphones",
      image: "../public/headphones2.jpg",
      price: 500,
      category: "Electronics",
      description: "Cheap headphones",
    },
    {
      id: 9,
      name: "Headphones",
      image: "../public/headphones3.jpg",
      price: 200,
      category: "Electronics",
      description: "Cheap headphones",
    },
    {
      id: 10,
      name: "Shoe",
      image: "../public/shoe2.jpg",
      price: 500,
      category: "Fashion",
      description: "Comfortable sneakers for everyday wear",
    },
    {
      id: 11,
      name: "Shoe",
      image: "../public/shoe3.jpg",
      price: 200,
      category: "Fashion",
      description: "Comfortable sneakers for everyday wear",
    },
    {
      id: 12,
      name: "Shoe",
      image: "../public/show4.jpg",
      price: 100,
      category: "Fashion",
      description: "Comfortable sneakers for everyday wear",
    },
  ],
};
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(data.products));
}


const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links-group");

// Cart array to store cart items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let count = document.getElementById("count");

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

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});
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
function listProducts(products = data.products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear the container

  if (products.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <h2 id="product-title">${product.name}</h2>
      <img src="${product.image}" alt="${product.name}" />
      <p>GHS ${product.price}</p>
      <button class="tooltip" onclick="addToCart(${product.id})">
        <span class="tooltip-text">Add to Cart</span>
        <i id="add-icon" class="fa-solid fa-plus"></i>
      </button>
      <button class="tooltip" onclick="showDetails(${product.id})">View Details</button>
    `;
    container.appendChild(productDiv);
    
  });
}
let totalitems = localStorage.getItem("count") ||0 ;
count.textContent = totalitems;

function updateCount() {
  
  
  totalitems = cart.reduce((sum, item) => sum + item.quantity, 1);

  localStorage.setItem("count", totalitems);
  count.textContent = totalitems;
  console.log(totalitems);
  
}
updateCart()
// // function to add a product to the cart
function addToCart(productId) {
  const product = data.products.find((p) => p.id === productId);
  const existingProduct = cart.find((item) => item.id === productId);
  updateCount();

  if (existingProduct) {
    existingProduct.quantity += 1;
    existingProduct.total = existingProduct.quantity * product.price;
  } else {
    cart.push({ ...product, quantity: 1, total: product.price });
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  updateCart();

  // Update details modal if open
  const detailsContainer = document.getElementById("product-details");
  if (
    detailsContainer &&
    !document.getElementById("details-modal").classList.contains("hidden")
  ) {
    const quantity = existingProduct ? existingProduct.quantity : 1;
    const total = quantity * product.price;

    detailsContainer.querySelector(
      ".product-quantity"
    ).textContent = `Quantity in Cart: ${quantity}`;
    detailsContainer.querySelector(
      ".product-total"
    ).textContent = `Total: GHS ${total}`;
  }
  alert(`${product.name} has been added to the cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
  updateCart();
  updateCount();
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
    <p>Product :${product.description}</p>
    <div class="product-details">
    <div>
    <p>Price: GHS ${product.price}</p>
    </div>
    <div>
    <p class="product-quantity">Quantity in Cart: ${quantity}</p>
    </div>
    </div>
    <p class="product-total">Total: GHS ${total}</p>
    <button onclick="addToCart(${product.id})">Add to Cart</button>
    <button onclick="closeDetailsModal()">Close</button>
  `;

  modal.classList.remove("hidden"); // Show the modal
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

document.getElementById("details-modal").addEventListener("click", (event) => {
  if (event.target === document.getElementById("details-modal")) {
    document.getElementById("details-modal").classList.add("hidden");
  }
});

// Function to close the product details modal
function closeDetailsModal() {
  document.getElementById("details-modal").classList.add("hidden");
}

// Cart Modal functionality
// document.getElementById("cart-icon").addEventListener("click", () => {
//   document.getElementById("cart-modal").classList.remove("hidden");
// });

// Close cart modal
function closeCartModal() {
  document.getElementById("cart-modal").classList.add("hidden");
}

// Checkout Modal functionality
document
  .getElementById("checkout-button")
  .addEventListener("click", showCheckoutModal);



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
  alert("Order submitted successfully!");
  closeCheckoutModal();
  cart = []; // Clear the cart
  localStorage.removeItem("cart"); // Remove cart from localStorage
  updateCart();
  updateCount(); // Reset the cart count
});
// Initialize the page with categories and products
populateCategories();
const products = JSON.parse(localStorage.getItem("products"));
listProducts(products);
