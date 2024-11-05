"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPremiumStatus = exports.handleWebhook = exports.createCheckoutSession = void 0;
const stripe_1 = __importDefault(require("stripe"));
const user_model_1 = __importDefault(require("../models/user.model"));
const email_service_1 = require("../services/email.service");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-09-30.acacia",
});
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Lifetime Subscription",
                        },
                        unit_amount: 1000, // $10
                    },
                    quantity: 1,
                },
            ],
            customer_email: user.email,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            client_reference_id: user._id.toString(),
        });
        res.json({ sessionId: session.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create charge" });
    }
});
exports.createCheckoutSession = createCheckoutSession;
const handleWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.client_reference_id;
        if (userId) {
            const user = yield user_model_1.default.findByIdAndUpdate(userId, { isPremium: true }, { new: true });
            console.log(`User ${userId} upgraded to premium`);
            if (user && user.email) {
                yield (0, email_service_1.sendPremiumConfirmationEmail)(user.email, user.displayName);
            }
        }
    }
    res.json({ received: true });
});
exports.handleWebhook = handleWebhook;
const getPremiumStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user.isPremium) {
        res.json({ status: "active" });
    }
    else {
        res.json({ status: "inactive" });
    }
});
exports.getPremiumStatus = getPremiumStatus;
