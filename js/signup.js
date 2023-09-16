import { userRecords } from "./utilities.js";

const signupForm = document.querySelector("#signup-form");
const usernameInput = document.querySelector("#new-username");
const passwordInput = document.querySelector("#new-password");

const createNewUser = (e) => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  if(username === "") {
    alert("Please enter username");
    return;
  }
  if(password === "") {
    alert("Please enter password");
    passwordInput.focus();
    return;
  }
  let recordsOfUsers = JSON.parse(localStorage.getItem("userRecords")) || userRecords;
  const user = recordsOfUsers.find( (user) => user.username === username)
  if(Boolean(user)) {
    alert("Username exists, please use another username");
    signupForm.reset();
  } else {
    const newUser = {
      username: username,
      password: password
    }
    recordsOfUsers.push(newUser);
    localStorage.setItem("userRecords", JSON.stringify(recordsOfUsers));
    signupForm.reset();
    usernameInput.focus();
    alert("Sign up successful!");
  }
  // console.log("user records", userRecords);
}

signupForm.addEventListener("submit", createNewUser);