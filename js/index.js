import { getAllProducts, logUserOut, getThisYear } from "./utilities.js";

const categoriesContainer = document.querySelector(".categories-conatiner");
const pdtContainer = document.querySelector(".products-container");
const logout = document.querySelector("#logout");
const loggedUsername = document.querySelector("#loggedUser");
const loginTab = document.querySelector(".drop-btn");
const year = document.querySelector(".year");
const searchInput = document.querySelector(".search-bar input[type='search']");
const searchBtn = document.querySelector(".search-bar input[type='button']");

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

async function populateProductCards() {
  const allProducts = await getAllProducts();
  pdtContainer.innerHTML = "";
  allProducts.forEach( (product) => {
    // create card
    const card = document.createElement("a");
    // getting and store product id
    card.addEventListener("click", () => {
      localStorage.setItem("productId", product.id);
    })
    card.href = "./product.html";
    card.innerHTML = `
      <section class="product-card">
        <div class='image-wrapper'>
          <img src="${product.images[0]}" alt="product-image">
        </div>
        <div class="description-wrapper">
          <h3 id="product-title">${product.title}</h3>
          <p id="product-description">${product.description}</p>
          <h3 id="product-price">$${product.price}</h3>
        </div>
      </section>
    `;
    //  add to dom
    pdtContainer.appendChild(card);
  });
}

async function populateCategories() {
  const allProducts = await getAllProducts();
  const allCategories = [];
  allProducts.forEach( (product) => {
    allCategories.push(product.category)
  });
  const allCategoriesPrecise = allCategories.reduce( (categoriesAcc, currentCategory) => {
    if(!categoriesAcc.includes(currentCategory)) {
      categoriesAcc.push(currentCategory);
    }
    return categoriesAcc;
  }, ["all"]);
  allCategoriesPrecise.forEach( (category) => {
    const categoryTag = document.createElement("div");
    categoryTag.classList.add("category-item");
    categoryTag.textContent = category;
    categoriesContainer.appendChild(categoryTag);
    categoryTag.addEventListener("click", showItemsInCategory);
  });
}

async function showItemsInCategory(e) {
  const selectedCategoryDiv = e.target;
  const selectedCategory = e.target.innerText;
  const allCategoriesDiv = document.querySelectorAll(".category-item");
  Array.from(allCategoriesDiv).forEach( (categoryDiv) => {
    if (categoryDiv.classList.contains("selected-category")){
      categoryDiv.classList.remove("selected-category");
    }
  });
  if (selectedCategory === "all") {
    populateProductCards();
    return;
  }
  selectedCategoryDiv.classList.add("selected-category");
  const allProducts = await getAllProducts();
  const allProductsInSelectedCategory = allProducts.filter( (product) => product.category === selectedCategory);
  pdtContainer.innerHTML = "";
  allProductsInSelectedCategory.forEach( (selectedCategoryProduct) => {
    // create card
    const card = document.createElement("a");
    card.addEventListener("click", () => {
      localStorage.setItem("productId", selectedCategoryProduct.id);
    })
    card.href = "./product.html";
    card.innerHTML = `
      <section class="product-card">
        <div class='image-wrapper'>
          <img src="${selectedCategoryProduct.images[0]}" alt="product-image">
        </div>
        <div class="description-wrapper">
          <h3 id="product-title">${selectedCategoryProduct.title}</h3>
          <p id="product-description">${selectedCategoryProduct.description}</p>
          <h3 id="product-price">$${selectedCategoryProduct.price}</h3>
        </div>
      </section>
    `;
    //  add to dom
    pdtContainer.appendChild(card);
  });
}

// search btn - display products where search input text includes product title else no item found
async function displaySearchProducts() {
  const userInput = searchInput.value;
  if (userInput === "") {
    return;
  }
  // get all products
  const allProducts = await getAllProducts();
  //check input against product title, display those matches
  const searchedProducts = allProducts.filter( (searchedProduct) => {
    if(searchedProduct.title.toLowerCase().includes(userInput)) {
      return searchedProduct;
    }
  });
  // reset input value after search
  searchInput.value = "";
  if (searchedProducts.length > 0) {
    pdtContainer.innerHTML = "";
    searchedProducts.forEach( (product) => {
      // create card
      const card = document.createElement("a");
      card.addEventListener("click", () => {
        localStorage.setItem("productId", product.id);
      })
      card.href = "./product.html";
      card.innerHTML = `
        <section class="product-card">
          <div class='image-wrapper'>
            <img src="${product.images[0]}" alt="product-image">
          </div>
          <div class="description-wrapper">
            <h3 id="product-title">${product.title}</h3>
            <p id="product-description">${product.description}</p>
            <h3 id="product-price">$${product.price}</h3>
          </div>
        </section>
      `;
      //  add to dom
      pdtContainer.appendChild(card);
    });
  } else {
    pdtContainer.innerHTML = `<h2>No products found.</h2>`;
  }
}


populateCategories();
populateProductCards();
logout.addEventListener("click", logUserOut);
searchBtn.addEventListener("click", displaySearchProducts);