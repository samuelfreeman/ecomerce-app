document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-button");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutForm = document.getElementById("checkout-form");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links-group");
menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let count = document.getElementById("count");
  let totalitems = localStorage.getItem("count") || 0; 
  count.textContent = totalitems;

  console.log(cart);

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-image">
                <div class="cart-details">
                    <span class="cart-item-name">${item.name} (x${item.quantity})</span>
                    <span class="cart-item-price">GHS ${item.total}</span>
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                        <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.total;
        });
    }
    
    updateCount();
    totalPriceElement.textContent = totalPrice.toFixed(2);
}


  window.updateCount = () => {
    
    totalitems = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("count", totalitems);
    count.textContent = totalitems;
  };

  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCount();
    renderCart();
  };

  window.updateQuantity = (index, quantity) => {
    quantity = parseInt(quantity);
    if (quantity > 0) {
      cart[index].quantity = quantity;
      cart[index].total = cart[index].price * quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  };

  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      checkoutModal.classList.remove("hidden");
    }
  });

  document.getElementById("checkout-modal").addEventListener("click", (event) => {
    if (event.target === checkoutModal) {
      checkoutModal.classList.add("hidden");
    }
  });
  function closeCheckoutModal() {
    document.getElementById("checkout-modal").classList.add("hidden");
  }
  



  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Order submitted successfully!");
    closeCheckoutModal();
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  });

  renderCart();
});
