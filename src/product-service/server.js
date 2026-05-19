const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

const products = [
  { id: 1, name: "Laptop Pro",    price: 1299.99, category: "Electronics", stock: 15 },
  { id: 2, name: "Wireless Mouse",price: 29.99,   category: "Electronics", stock: 80 },
  { id: 3, name: "Standing Desk", price: 499.99,  category: "Furniture",   stock: 5  },
];

app.get("/", (req, res) => res.json({ service: "Product Service", status: "Running", port: PORT }));
app.get("/products", (req, res) => res.json(products));
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: "Product not found" });
});
app.post("/products", (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.status(201).json(product);
});
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  index !== -1 ? products.splice(index, 1) && res.json({ message: "Deleted" })
               : res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => console.log(`Product service running on http://localhost:${PORT}`));