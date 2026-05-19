const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

const orders = [
  { id: 1, userId: 1, product: "Laptop Pro",     quantity: 1, total: 1299.99, status: "delivered" },
  { id: 2, userId: 2, product: "Wireless Mouse",  quantity: 2, total: 59.98,  status: "processing" },
  { id: 3, userId: 1, product: "Standing Desk",   quantity: 1, total: 499.99, status: "shipped" },
];

app.get("/", (req, res) => res.json({ service: "Order Service", status: "Running", port: PORT }));

app.get("/orders", (req, res) => res.json(orders));

app.get("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  order ? res.json(order) : res.status(404).json({ error: "Order not found" });
});

app.post("/orders", (req, res) => {
  const order = { id: orders.length + 1, status: "pending", ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

app.patch("/orders/:id/status", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });
  order.status = req.body.status;
  res.json(order);
});

app.listen(PORT, () => console.log(`Order service running on http://localhost:${PORT}`));