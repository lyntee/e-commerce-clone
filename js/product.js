import { getSingleProduct, logUserOut, getThisYear } from "./utilities.js";

const mainContainer = document.querySelector("main");
const loggedUsername = document.querySelector("#loggedUser");
const loginTab = document.querySelector(".drop-btn");
const logout = document.querySelector("#logout");
const year = document.querySelector(".year");

window.addEventListener("load", () => {
  year.textContent = getThisYear();
  // if there's a logged user
  if(Boolean(localStorage.getItem("loggedUser"))) {
    loggedUsername.textContent = JSON.parse(localStorage.getItem("loggedUser")).username;
  }
  else {
    loginTab.href = "../html/login.html";
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.style.display = "none";
  }
});

const getProductDetails = async ()  => {
  const product = await getSingleProduct(localStorage.getItem("productId"))
  mainContainer.innerHTML = ``;
  mainContainer.innerHTML = `
  <section class="product-image-wrapper">
    <img src=${product.images[0]} alt="product-main-image">
  </section>
  <section class="product-details-wrapper">
    <h1 id="product-title">${product.title}</h1>
    <p id="product-description">${product.description}</p>
    <meter class="average-rating" min="0" max="5" value="${product.rating}" title="${product.rating} out of 5 stars">${product.rating} out of 5</meter>
    <h1 id="product-price">$${product.price}</h1>
    <h4 id="product-stock">Stock Left: ${product.stock}</h4>
    <form class="add-to-cart-form">
    <div class="quantity-input-wrapper">
        <label for="quantity">Quantity</label>
        <input id="quantity" type="number" value="1" min="1" max="${product.stock}">
      </div>
      <input type="button" value="Add to cart" class="buttons">
    </form>
  </section>
  `;
  const addToCartForm = document.querySelector(".add-to-cart-form");
  addToCartForm.addEventListener("click", () => addProductToCart());
}

async function addProductToCart() {
  // if there's a logged user
  if(Boolean(localStorage.getItem("loggedUser"))) {
    const qty = document.querySelector("#quantity");
    const product = await getSingleProduct(localStorage.getItem("productId"))
    // console.log(product)
    const quantityPurchased = qty.value;
    // console.log(quantityPurchased);
    const item = {
      quantity: quantityPurchased,
      product: product
    }
    
    const currentUser = JSON.parse(localStorage.getItem("userRecords")).find( (user) => user.username === JSON.parse(localStorage.getItem("loggedUser")).username
    );
    const shoppingCart = currentUser.cartItems || [];
    shoppingCart.push(item);
    currentUser.cartItems = shoppingCart;
    const allUsers = JSON.parse(localStorage.getItem("userRecords"));
    let indexOfCurrentUser;
    allUsers.forEach( (user, index) => {
      if(user.username === currentUser.username) {
        indexOfCurrentUser = index;
      }
    }); 
    allUsers[indexOfCurrentUser] = currentUser;
    localStorage.setItem("userRecords", JSON.stringify(allUsers));
    window.location.href = "../html/shopping-cart.html";
  } else {
    alert("Please login to make purchases")
    window.location.href = "../html/login.html";
  }
}

getProductDetails();
logout.addEventListener("click", logUserOut);