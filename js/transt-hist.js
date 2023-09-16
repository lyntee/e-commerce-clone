import { logUserOut, getThisYear, getCurrentUserIndex, PRODUCTS_URL, getSingleProduct } from "./utilities.js";

const shippingListContainer = document.querySelector(".shipping-list-container");
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
let pdtId;
let purchasedQty;

// populate checkout cart list
const populateShippingList = () => {
  const checkoutCart = JSON.parse(localStorage.getItem("userRecords"))[currentUserIndex].checkoutCart || [];
  if(checkoutCart.length > 0) {
    checkoutCart.forEach((cartItem) => {
      let subtotal = 0;
      const card = document.createElement("article");
      card.classList.add ("shipping-list-item");
      card.innerHTML = `
        <h3 class="order-no">Order Transaction No.: ${cartItem.orderNo}</h3>
        `;
        cartItem.items.forEach( (productItem) => {
          pdtId = productItem.product.id;
          console.log(productItem)
          const productCard = document.createElement("section");
          productCard.classList.add("cart-item");
          productCard.innerHTML = `
          <section class="shopping-cart-item">
              <div class="image-wrapper">
                <img src="${productItem.product.thumbnail}" alt="product-thumbnail" width="10px" >
              </div>
              <div class="product-details">
              <p class="product-title">${productItem.product.title}</p>
              <p class="product-quantity">Qty: ${productItem.quantity}</p>
              <p class="product-unit-price">Unit Price: $${productItem.product.price}</p>
              </div>
          </section>
          `;
          subtotal += Number(`${productItem.quantity}`) * Number(`${productItem.product.price}`)
          purchasedQty = productItem.quantity;
          card.appendChild(productCard);
      });
      const totalPrice = document.createElement("h4");
      totalPrice.classList.add("total-price");
      totalPrice.textContent = `Total: $${subtotal}`;
      card.appendChild(totalPrice);
      shippingListContainer.appendChild(card);
    });
  }
  else {
    shippingListContainer.innerHTML = "<h2>No transaction history.</h2>";
  }
}

// update stock amount after confirm payment
const updateStockAmt = async () => {
  const product = await getSingleProduct(pdtId);
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stock: product.stock - Number(purchasedQty)
    })
  };
  const response = await fetch(`${PRODUCTS_URL}/${pdtId}`, options);
  const data = await response.json();
  //  Updating a product will not update it into the server.
  //  It will simulate a PUT/PATCH request and will return the product with modified data
  console.log(data);
}

populateShippingList();
updateStockAmt();
logout.addEventListener("click", logUserOut);