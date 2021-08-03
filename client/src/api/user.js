export async function fetchUser(userId) {
  try {
    const resp = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function createUser() {
  try {
    const resp = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

export async function updateUser(user) {
  try {
    const resp = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await resp.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
