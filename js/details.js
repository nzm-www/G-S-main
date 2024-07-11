const details = document.getElementById("details-container");

document.addEventListener("DOMContentLoaded", () => {
  const url = window.location.href;
  let id = url.split("id=")[1];

  if (!id) {
    window.location.assign(`http://127.0.0.1:5500/index.html`);
    return;
  }

  async function getDate(url) {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  getDate(`https://cars-pagination.onrender.com/products/${id}`)
    .then((data) => {
      if (!data) {
        console.error("No data returned for the product");
        return;
      }

      let productImg = document.getElementById("product-image");
      let productTitle = document.getElementById("product-title");
      let productPrice = document.getElementById("product-price");
      let cardBtn = document.getElementById("card-btn");

      productImg.setAttribute("src", data.image);
      productTitle.innerHTML = data.name;
      productPrice.innerHTML = data.newPrice + "₽";

      cardBtn.addEventListener("click", function () {
        saveToLocalStorage(data);
      });
    })
    .catch((err) => {
      console.log("Error fetching product details:", err);
    });

  function saveToLocalStorage(product) {
    try {
      console.log("Current product to save:", product);
      let carts = localStorage.getItem("carts");
      if (!carts) {
        carts = [];
      } else {
        carts = JSON.parse(carts);
        if (!Array.isArray(carts)) {
          carts = [];
        }
      }

      const existingProduct = carts.find((item) => item.id === product.id);
      if (existingProduct) {
        alert("Bu maxsulot allaqachon qo'shilgan");
        return;
      }

      carts.push(product);
      localStorage.setItem("carts", JSON.stringify(carts));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }
});
