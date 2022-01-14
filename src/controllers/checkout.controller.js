const stripe = require('stripe')("sk_test_51IYB3kKHE4A4HHrOUKXd5GZqbWNq1QSmWvqY2al9fB1K2XCKk3vlC7N0e8Ob20IZVLEYrExnMZycwBlTKPuyrnNY001cANctnM");

const initiateStripeSession = async (req) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: "test product"
              },
              unit_amount: 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `http://localhost:3000/confirmation`,
        cancel_url: `http://localhost:3000/cancel`,
      });
    return session;
}

exports.createSession = async function (req, res) {
    try {
      const session = await initiateStripeSession(req);
      res.status(200).json({
        id: session.id,
        price: session.amout_total,
        currency: session.currency,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };