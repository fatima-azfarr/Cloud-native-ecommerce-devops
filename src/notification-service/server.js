const express = require("express");
const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.json());

const notifications = [];

app.get("/", (req, res) => res.json({ service: "Notification Service", status: "Running", port: PORT }));
app.get("/notifications", (req, res) => res.json(notifications));
app.post("/notify/email", (req, res) => {
  const { to, subject, message } = req.body;
  const notif = { id: notifications.length + 1, type: "email", to, subject, message, sentAt: new Date() };
  notifications.push(notif);
  console.log(`Email sent to ${to}: ${subject}`);
  res.status(201).json({ success: true, notification: notif });
});
app.post("/notify/in-app", (req, res) => {
  const { userId, message } = req.body;
  const notif = { id: notifications.length + 1, type: "in-app", userId, message, sentAt: new Date() };
  notifications.push(notif);
  res.status(201).json({ success: true, notification: notif });
});

app.listen(PORT, () => console.log(`Notification service running on http://localhost:${PORT}`));