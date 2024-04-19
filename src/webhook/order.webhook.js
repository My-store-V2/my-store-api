const db = require("../models");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_VALIDATION;
module.exports = {
    validateOrder: async (req, res) => {
        try {
            const sig = req.headers['stripe-signature'];
            const body = req.rawBody;

            let event = null;

            try {
                event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
            } catch (err) {
                // invalid signature
                console.error(err);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }


            let intent = event?.data?.object;

            if (intent == null || intent == undefined) {
                console.error("Intent not found");
                return res.status(400).send(`Webhook Error: Intent not found`);
            }

            if (!intent.id) {
                console.error("Not a payment intent");
                return res.status(400).send(`Webhook Error: Not a payment intent`);
            }

            // Find in the database the order corresponding to the payment intent
            let order = await db.Orders.findOne({
                where: { stripe_payment_id: intent?.id }
            });
            if (!order) {
                console.error("Order not found");
                return res.status(404).send(`Webhook Error: Order not found`);
            }
            switch (event['type']) {
                case 'payment_intent.succeeded':
                    // Update the order status to 'paid'
                    order.status = 'payed';
                    order.save();
                    break;
                case 'payment_intent.payment_failed':
                    const message = intent?.last_payment_error?.message;
                    // Find in the database the order corresponding to the payment intent
                    // Update the order status to 'failed'
                    order.status = 'failed';
                    order.save();
                    break;
            }
            // await order.save();

            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred');
        }
    }
};