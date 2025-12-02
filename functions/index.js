// const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// // const multer = require("multer");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // const upload = multer({ dest: "uploads/" });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (username === "admin" && password === "1234") {
//     res.json({ success: true, message: "Login successful" });
//   } else {
//     res.json({ success: false, message: "Invalid credentials" });
//   }
// });

// app.post("/logout", (req, res) => {
//   res.json({ success: true, message: "Logged out successfully" });
// });

// // app.post("/upload", upload.single("file"), (req, res) => {
// //   if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
// //   const tempPath = req.file.path;
// //   const targetPath = path.join("uploads", req.file.originalname);
// //   fs.rename(tempPath, targetPath, (err) => {
// //     if (err) return res.status(500).json({ success: false, message: "File saving error" });
// //     res.json({ success: true, message: "File uploaded successfully", filename: req.file.originalname });
// //   });
// // });

// app.get("/", (req, res) => {
//   res.send("Server is running via Firebase Functions");
// });

// exports.api = functions.https.onRequest(app);


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// Import your existing backend logic
const { loginUser, registerUser, logoutUser } = require("../server/server"); // adjust the path to your actual server code
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../server/server"); // your post logic

const app = express();
app.use(cors());
app.use(express.json());

// --- Authentication Routes ---
app.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});

app.post("/users/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await registerUser(email, password);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/users/logout", async (req, res) => {
  try {
    const token = req.headers["x-authorization"];
    await logoutUser(token);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Post Routes ---
app.get("/data/posts", async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

app.get("/data/posts/:id", async (req, res) => {
  const post = await getPostById(req.params.id);
  res.json(post);
});

app.post("/data/posts", async (req, res) => {
  try {
    const token = req.headers["x-authorization"];
    const newPost = await createPost(req.body, token);
    res.json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/data/posts/:id", async (req, res) => {
  try {
    const token = req.headers["x-authorization"];
    const updatedPost = await updatePost(req.params.id, req.body, token);
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/data/posts/:id", async (req, res) => {
  try {
    const token = req.headers["x-authorization"];
    await deletePost(req.params.id, token);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Health Check ---
app.get("/", (req, res) => {
  res.send("Server is running via Firebase Functions");
});

// Export the API
exports.api = functions.https.onRequest(app);
