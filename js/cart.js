// JavaScript
function renderCartItems() {
  let carts = localStorage.getItem("carts");
  const cartItemsContainer = document.getElementById("cart-items-container");

  if (carts) {
    carts = JSON.parse(carts);

    cartItemsContainer.innerHTML = ""; // Clear previous items

    carts.forEach((cart, index) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
          <img src="${cart.image}" alt="Product Image" class="product-image">
          <div class="product-details">
            <h3 class="product-name">${cart.name}</h3>
            <p class="product-brand">${cart.comments}</p>
          </div>
          <div class="product-price" style="padding-right: 40px;">${cart.newPrice}₽</div>
          <i class="delete-button" style="font-size: 20px; cursor: pointer;" data-index="${index}"><i class="fa-solid fa-trash"></i></i>
        `;

      const deleteButton = cartItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", function () {
        removeCartItem(index);
      });

      cartItemsContainer.appendChild(cartItem);
    });
  } else {
    cartItemsContainer.innerHTML = "<p>Savat bo'm bosh.</p>";
  }
}

function removeCartItem(index) {
  let carts = localStorage.getItem("carts");
  if (carts) {
    carts = JSON.parse(carts);
    carts.splice(index, 1);
    localStorage.setItem("carts", JSON.stringify(carts));
    renderCartItems(); 
  }
}

renderCartItems();
