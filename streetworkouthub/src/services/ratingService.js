// const baseUrl = "http://localhost:3030/data/ratings";
const baseUrl = "https://reactproject-rmwu.onrender.com/data/ratings";

export async function getRatings(postId) {
  const res = await fetch(`${baseUrl}?where=postId%3D%22${postId}%22`);
  return res.json();
}

export async function getUserRating(postId, userId) {
  const res = await fetch(
    `${baseUrl}?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22`
  );
  const data = await res.json();
  return data[0] || null;
}

export async function ratePost(postId, rating, userId, token) {
  const existing = await getUserRating(postId, userId);

  if (existing) {
    const res = await fetch(`${baseUrl}/${existing._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({ postId, rating }),
    });

    return res.json();
  }

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify({ postId, rating }),
  });

  return res.json();
}
