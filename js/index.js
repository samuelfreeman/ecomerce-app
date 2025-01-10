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


const container = document.getElementById("product-container");


data.products.forEach((product) => {
  
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  
  productDiv.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" alt="${product.name}"  />
    <p>Price: $${product.price}</p>
    <p>${product.description}</p>
  `;

  
  container.appendChild(productDiv);
});
