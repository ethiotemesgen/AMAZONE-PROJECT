const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// ================= CORS =================
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.status(200).json({ message: "SUCCESS!" });
});

// ================= CREATE PAYMENT INTENT =================
app.post("/payments/create", async (req, res) => {
  try {
    const total = Number(req.query.total || req.body.total);

    if (!total || total <= 0) {
      return res.status(400).json({ error: "Invalid total amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // in cents
      currency: "usd",
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
