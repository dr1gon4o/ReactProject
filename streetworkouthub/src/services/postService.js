const baseUrl = "http://localhost:3030/data/posts";
// const baseUrl = "https://reactproject-rmwu.onrender.com/data/posts";

export async function getAll() {
  const res = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`);
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export async function getOne(id) {
  const res = await fetch(`${baseUrl}/${id}`);
  return res.json();
}

export async function createPost(data, token) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePost(id, data, token) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id, token) {
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: { "X-Authorization": token },
  });
}
