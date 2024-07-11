document.addEventListener("DOMContentLoaded", () => {
  let select = document.getElementById("select");

  const apiUrl =
    "https://cars-pagination.onrender.com/products/category?category=известный";

  fetchProducts(apiUrl);

  select.addEventListener("change", function () {
    let categoryUrl = "";
    if (select.value === "popularity") {
      categoryUrl =
        "https://cars-pagination.onrender.com/products/category?category=известный";
    } else if (select.value === "unpopulary") {
      categoryUrl =
        "https://cars-pagination.onrender.com/products/category?category=не популярен";
    } else {
      categoryUrl =
        "https://cars-pagination.onrender.com/products/category?category=средний";
    }

    fetchProducts(categoryUrl);
  });

  function fetchProducts(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const productList = document.getElementById("product-list");
        const productList2 = document.getElementById("product-list2");
        productList.innerHTML = "";

        data.forEach((product) => {
          const availability = product.isExist;
          const image = product.image
            ? `<img src="${product.image}" alt="Product 1" />`
            : `<img src="../images/white-2-storey-house-near-trees-1115804.png" alt="Product 1" />`;

          productList.innerHTML += `
            <div class="product-card" data-id="${product.id}">
              ${availability}
              ${image}
              <div class='popular'>
                <h4>${product.star} звезда</h4>
                <p>${product.category}</p>
              </div>
              <h3>${product.name}</h3>
              <div class='price'>
                <h2>${product.newPrice}₽</h2>
                <del>${product.oldPrice}₽</del>
              </div>
            </div>
          `;

          productList2.innerHTML += `
            <div class="product-card" data-id="${product.id}">
              ${availability}
              <img src="${product.image}" alt="Product 1" />
              <h3>${product.name}</h3>
              <h2>${product.newPrice}₽</h2>
              <del>${product.oldPrice}₽</del>
              <h4>${product.star} звезда</h4>
            </div>
          `;
        });

        const productCards = document.querySelectorAll(".product-card");
        productCards.forEach((card) => {
          card.addEventListener("click", function () {
            const cardId = this.getAttribute("data-id");
            if (cardId) {
              window.location.assign(
                `http://127.0.0.1:5500/pages/details.html?id=${cardId}`
              );
            }
          });
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
});
