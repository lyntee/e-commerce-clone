import { logUserOut, getThisYear, getCurrentUserIndex } from "./utilities.js";

const cartContainer = document.querySelector(".cart-container");
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

let currentUserIndex = getCurrentUserIndex();

// populate shopping cart
const populateCartItems = () => {
  // get the shopping list from local storage
  const shoppingCart = JSON.parse(localStorage.getItem("userRecords"))[currentUserIndex].cartItems || [];
  // console.log(shoppingCart)
  if (shoppingCart.length > 0) {
    cartContainer.innerHTML = ``;
    shoppingCart.forEach( (cartItem, index) => {
      const cartItemCard = document.createElement("section");
      cartItemCard.classList.add("cart-item");
      // get product thumbnail, title, qty, price
      cartItemCard.innerHTML = `
    <input type="checkbox">
      <div class="shopping-cart-item">
      <div class="image-wrapper">
      <img src="${cartItem.product.thumbnail}" alt="product-thumbnail">
        </div>
        <p class="product-title">${cartItem.product.title}</p>
        <p class="product-quantity">Qty: ${cartItem.quantity}</p>
        <p class="product-unit-price">Unit Price: $${cartItem.product.price}</p>
        <p class="item-subtotal">Subtotal: $${Number(cartItem.quantity) * Number(cartItem.product.price)}</p>
        </div>
        `;
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("buttons");
      removeBtn.textContent = "Remove";
      cartItemCard.appendChild(removeBtn);
      cartContainer.appendChild(cartItemCard);
      removeBtn.addEventListener("click", () => removeItem(index));
    });
    const checkoutBtn = document.createElement("button");
    checkoutBtn.classList.add("checkout-btn", "buttons");
    checkoutBtn.textContent = "Checkout";
    cartContainer.appendChild(checkoutBtn);
    checkoutBtn.addEventListener("click", () => goToPaymentPage());
  } else {
    cartContainer.innerHTML = `<h2>No items in shopping cart.</h2>`;
  }
}

const removeItem = (index) => {
  const cartItems = JSON.parse(localStorage.getItem("userRecords"))[currentUserIndex].cartItems;
  cartItems.splice(index, 1);
  const currentUser = JSON.parse(localStorage.getItem("userRecords")).find( (user) => user.username === JSON.parse(localStorage.getItem("loggedUser")).username
    );
  currentUser.cartItems = cartItems;
  const allUsers = JSON.parse(localStorage.getItem("userRecords"));
  allUsers[currentUserIndex] = currentUser;
  localStorage.setItem("userRecords", JSON.stringify(allUsers));
  populateCartItems();
}

const goToPaymentPage = () => {
  const allCartItems = document.querySelectorAll(".cart-item");
  const checkoutCart = JSON.parse(localStorage.getItem("userRecords"))[currentUserIndex].checkoutCart || [];
  const cartItems = JSON.parse(localStorage.getItem("userRecords"))[currentUserIndex].cartItems;
  const indexesOfCheckoutItems = [];
  const checkoutItem = {
    orderNo: "ot-" + Date.now(),
    items: []
  }
  Array.from(allCartItems).forEach((item, index) => {
    // input checkbox that are checked
    if (item.firstElementChild.checked) {
      indexesOfCheckoutItems.push(index);
    }
  });
  //  add item to checkoutcart
  indexesOfCheckoutItems.forEach( (i) => {
    checkoutItem.items.push(cartItems[i]);
  });
  
  // remove item from cartitems
  const cartItemsAfterCheckout = cartItems.filter( (item, index) => !indexesOfCheckoutItems.includes(index));

  // if items is empty then dont add
  if (checkoutItem.items.length > 0) {
    checkoutCart.push(checkoutItem);
  }

  const currentUser = JSON.parse(localStorage.getItem("userRecords")).find( (user) => user.username === JSON.parse(localStorage.getItem("loggedUser")).username
    );
  currentUser.checkoutCart = checkoutCart;
  currentUser.cartItems = cartItemsAfterCheckout;
  
  const allUsers = JSON.parse(localStorage.getItem("userRecords"));
  allUsers[currentUserIndex] = currentUser;
  localStorage.setItem("userRecords", JSON.stringify(allUsers));

  populateCartItems();

  if (checkoutItem.items.length > 0) {
    // re direct to payment page
    window.location.href = "../html/payment.html";
  } 
  else {
    alert("Please select items to checkout");
  }
}
  
  
populateCartItems();
logout.addEventListener("click", logUserOut);