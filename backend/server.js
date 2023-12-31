const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const stripe = require("stripe")(process.env.STRIPE_KEY);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: req.body.line_items,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/",
    });
    console.log(session);
    return res.status(201).json(session);
  } catch (error) {
    res.json(500).json(error);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
