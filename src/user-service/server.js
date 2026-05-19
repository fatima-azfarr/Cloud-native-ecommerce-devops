const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const users = [
  { id: 1, name: "Fatima", email: "fatima@shopflow.com", role: "Admin" },
  { id: 2, name: "Araish", email: "araish@shopflow.com", role: "Customer" },
];

app.get("/", (req, res) => res.json({ service: "User Service", status: "Running", port: PORT }));
app.get("/users", (req, res) => res.json(users));
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
});
app.post("/users", (req, res) => {
  const user = { id: users.length + 1, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.listen(PORT, () => console.log(`User service running on http://localhost:${PORT}`));