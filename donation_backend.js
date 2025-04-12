app.post("/create-checkout-session", async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd", // Make sure it's correctly set
                        product_data: { name: "Peer Platform Donation" },
                        unit_amount: Math.round(amount * 100), // Ensure proper cents conversion
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ sessionId: session.id }); // Ensure key name consistency
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
