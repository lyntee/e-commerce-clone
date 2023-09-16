const userRecords = [
  {
    username: "admin",
    password: "shopping"
  }
];

// const products = [
//   { id:1, 
//     title:"iPhone 9", 
//     description:"An apple mobile which is nothing like apple",
//     price:549,
//     rating:4.69,
//     stock:94,
//     category:"smartphones",
//     thumbnail:"https://i.dummyjson.com/data/products/1/thumbnail.jpg",images:["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"]
//   },
//   { id:6,
//     title:"MacBook Pro",
//     description:"MacBook Pro 2021 with mini-LED display may launch between September, November",
//     price:1749,
//     rating:4.57,
//     stock:83,
//     category:"laptops",
//     thumbnail:"https://i.dummyjson.com/data/products/6/thumbnail.png",images:["https://i.dummyjson.com/data/products/6/1.png","https://i.dummyjson.com/data/products/6/2.jpg","https://i.dummyjson.com/data/products/6/3.png","https://i.dummyjson.com/data/products/6/4.jpg"]
//   },
//   {
//     id:12,
//     title:"Brown Perfume",
//     description:"Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
//     price:40,
//     rating:4,
//     stock:52,
//     category:"fragrances",
//     thumbnail:"https://i.dummyjson.com/data/products/12/thumbnail.jpg",images:["https://i.dummyjson.com/data/products/12/1.jpg","https://i.dummyjson.com/data/products/12/2.jpg","https://i.dummyjson.com/data/products/12/3.png","https://i.dummyjson.com/data/products/12/4.jpg","https://i.dummyjson.com/data/products/12/thumbnail.jpg"]
//   },
//   {
//     id:17,
//     title:"Tree Oil 30ml",
//     description:"Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",price:12,
//     rating:4.52,
//     stock:78,
//     category:"skincare",
//     thumbnail:"https://i.dummyjson.com/data/products/17/thumbnail.jpg",images:["https://i.dummyjson.com/data/products/17/1.jpg","https://i.dummyjson.com/data/products/17/2.jpg","https://i.dummyjson.com/data/products/17/3.jpg","https://i.dummyjson.com/data/products/17/thumbnail.jpg"]
//   },
//   {
//     id:25,
//     title:"Gulab Powder 50 Gram","description":"Dry Rose Flower Powder Gulab Powder 50 Gram • Treats Wounds",
//     price:70,
//     rating:4.87,
//     stock:47,
//     category:"groceries",
//     thumbnail:"https://i.dummyjson.com/data/products/25/thumbnail.jpg",images:["https://i.dummyjson.com/data/products/25/1.png","https://i.dummyjson.com/data/products/25/2.jpg","https://i.dummyjson.com/data/products/25/3.png","https://i.dummyjson.com/data/products/25/4.jpg","https://i.dummyjson.com/data/products/25/thumbnail.jpg"]
//   },
//   {
//     id:30,
//     title:"Key Holder","description":"Attractive DesignMetallic materialFour key hooksReliable & DurablePremium Quality",
//     price:30,
//     rating:4.92,
//     stock:54,
//     category:"home-decoration",
//     thumbnail:"https://i.dummyjson.com/data/products/30/thumbnail.jpg",images:["https://i.dummyjson.com/data/products/30/1.jpg","https://i.dummyjson.com/data/products/30/2.jpg","https://i.dummyjson.com/data/products/30/3.jpg","https://i.dummyjson.com/data/products/30/thumbnail.jpg"]
//   }
// ];

const PRODUCTS_URL = "https://dummyjson.com/products";

async function getAllProducts() {
  const response = await fetch(PRODUCTS_URL);
  const data = await response.json();
  // console.log(data.products);
  return data.products;
}

async function getSingleProduct(id) {
  const response = await fetch(`${PRODUCTS_URL}/${id}`);
  const data = await response.json();
  return data;
}

function logUserOut() {
  localStorage.removeItem("loggedUser");
  // localStorage.removeItem("cartItems");
  // localStorage.removeItem("checkoutCart");
  window.location.href = "../html/login.html";
}

function getThisYear() {
  const aDate = new Date();
  const thisYear = aDate.getFullYear();
  return thisYear;
}

function getCurrentUserIndex() {
  let currentUserIndex;
  const allUsers = JSON.parse(localStorage.getItem("userRecords"));
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  allUsers.forEach( (user, index) => {
    if(user.username === loggedUser.username) {
      currentUserIndex = index;
    }
  });
  return currentUserIndex;
}

export { userRecords, getAllProducts, getSingleProduct, logUserOut, getThisYear, getCurrentUserIndex, PRODUCTS_URL };