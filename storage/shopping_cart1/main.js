let carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "gray Tshirt",
    tag: "graytshirt",
    price: 100,
    inCart: 0,
  },
  {
    name: "gray Hoodie",
    tag: "grayhoodie",
    price: 150,
    inCart: 0,
  },
  {
    name: "black Tshirt",
    tag: "blacktshirt",
    price: 200,
    inCart: 0,
  },
  {
    name: "black Hoodie",
    tag: "blackhoodie",
    price: 250,
    inCart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

// 새로고침 시 localStorage은 정보를 유지하나, 화면에서는 0로 초기화되기 때문에 이를 방지
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");

  console.log(cartCost, typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let productContainer = document.querySelector(".products");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
      <div class="product">
        <i class="xi-close-circle"><i>
        <img src="http://www.placehold.it/80x100">
        <span>${item.name}</span>
      </div>
      <div class="price">$${item.price},00</div>
      <div class="quantity">
        <i class="decrease xi-caret-down-circle"></i>
        <span>${item.inCart}</span>
        <i class="increase xi-caret-down-circle"></i>
      </div>
      <div class="total">
        $${item.inCart * item.price},00
      </div>
      `;
    });

    productContainer.innerHTML += `
      <div class="BasketTotalContainer">
        <h4 class="basketTotalTitle">
          Basket Total
        </h4>
        <h4 class="basketTotal">
          $${cartCost},00
        </h4>
    `;
  }
}

onLoadCartNumbers();
displayCart();
