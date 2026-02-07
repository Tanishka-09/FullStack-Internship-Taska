function validateEmail() {
  const email = document.getElementById("email").value;
  const error = document.getElementById("error");

  if (email === "") {
    error.textContent = "Email is required";
    return false;
  }

  if (!email.includes("@")) {
    error.textContent = "Please enter a valid email address";
    return false;
  }

  error.textContent = "";
  alert("Subscribed successfully!");
  return true;
}
