const stripe = require("stripe")(
  "sk_test_51IYAy4EMn5LU6PTLwpnqc9bJdhlcRl00wA5zVAMDLC2hF2LXbI9gisvB2vcF7d2e4CtZEzbBhfZZRJGb7LnZyaJY00mbH6ynB0"
);

const initiateStripeSession = async (req) => {
  const priceDataArray = [];

  priceDataArray.push({
    price_data: {
      currency: "eur",
      product_data: {
        name: `  ${req.body.label} Subscribe`,
      },
      unit_amount: req.body.price * 100,
    },
    quantity: 1,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: priceDataArray,
    payment_intent_data: {
      // metadata: { userId: req.user.id, cart: JSON.stringify(req.body.cart) },
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/signin`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}`,
  });
  return session;
};

exports.createSession = async function (req, res) {
  try {
    console.log(req);
    const session = await initiateStripeSession(req);
    console.log(session);

    res.status(200).json({
      id: session.id,
      price: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
