import { getThisYear, logUserOut } from "./utilities.js";

const logout = document.querySelector("#logout");
const loggedUsername = document.querySelector("#loggedUser");
const loginTab = document.querySelector(".drop-btn");
const year = document.querySelector(".year");
const linkToTranstHist = document.querySelector("#link-to-trans-hist");

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
    linkToTranstHist.href = "#";
  }
});

logout.addEventListener("click", logUserOut);