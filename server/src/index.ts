import express from "express";
import bodyParser from "body-parser";
import { getAccessToken } from "./paypal";

import { baseURL } from "./constants";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

let accessToken = "";

getAccessToken()
  .then((res) => (accessToken = res))
  .catch((err) => console.error(err));

app.post("/create-order", async (req, res) => {
  const price = req.body;
  try {
    const response = await fetch(`${baseURL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "USD", value: price },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
              payment_method_selected: "PAYPAL",
              brand_name: "EXAMPLE INC",
              locale: "en-US",
              landing_page: "LOGIN",
              shipping_preference: "SET_PROVIDED_ADDRESS",
              user_action: "PAY_NOW",
              return_url: "https://example.com/returnUrl",
              cancel_url: "https://example.com/cancelUrl",
            },
          },
        },
      }),
    });
    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
