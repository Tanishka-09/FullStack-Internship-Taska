const API_URL = "http://localhost:3000/users";

// Load users on page load
window.onload = fetchUsers;

// Fetch all users
function fetchUsers() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById("usersTable");
      table.innerHTML = "";

      data.forEach(user => {
        table.innerHTML += `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
              <button onclick="editUser(${user.id}, '${user.name}', '${user.email}', ${user.age})">Edit</button>
              <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

// Add / Update user
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const userId = document.getElementById("userId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  // UPDATE user
  if (userId) {
    fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age })
    })
      .then(() => {
        resetForm();
        fetchUsers();
      });
  }
  // ADD user
  else {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, age })
    })
      .then(() => {
        this.reset();
        fetchUsers();
      });
  }
});

// Fill form for editing
function editUser(id, name, email, age) {
  document.getElementById("userId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("age").value = age;

  document.getElementById("submitBtn").innerText = "Update User";
}

// Delete user
function deleteUser(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  }).then(fetchUsers);
}

// Reset form after update
function resetForm() {
  document.getElementById("userForm").reset();
  document.getElementById("userId").value = "";
  document.getElementById("submitBtn").innerText = "Add User";
}
n