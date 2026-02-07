function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const error = document.getElementById("error");

  if (name === "" || email === "" || message === "") {
    error.textContent = "All fields are required.";
    return false;
  }

  if (!email.includes("@")) {
    error.textContent = "Please enter a valid email address.";
    return false;
  }

  error.textContent = "";
  alert("Form submitted successfully!");
  return true;
}

