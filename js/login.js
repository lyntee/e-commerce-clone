import { userRecords } from "./utilities.js";

const loginForm = document.querySelector("#login-form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

let wrongPwCount = 0;
let recordsOfUsers = JSON.parse(localStorage.getItem("userRecords")) || userRecords;

const loginToHomepage = (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const user = recordsOfUsers.find( (user) => user.username === username)
  if(Boolean(user)) {
    if(wrongPwCount < 3) {
      if(user.password === password) {
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "../html/index.html";
      } else {
        wrongPwCount++;
        alert("wrong password");
        // console.log("wrong pw count", wrongPwCount);
      }
    } else {
      alert("wrong password attempt > 3 times, Account locked", wrongPwCount);
      // disable inputs
      usernameInput.setAttribute("disabled", "");
      passwordInput.setAttribute("disabled", "");
      wrongPwCount = 0;
      // console.log("reset wrong pw count", wrongPwCount);
      loginForm.reset();
      usernameInput.focus();
    }
  } else {
    alert("user does not exist");
    loginForm.reset();
    usernameInput.focus();
  }
}

loginForm.addEventListener("submit", loginToHomepage)