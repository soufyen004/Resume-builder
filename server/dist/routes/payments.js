"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const payment_controller_1 = require("../controllers/payment.controller");
const router = express_1.default.Router();
router.get("/create-checkout-session", auth_1.isAuthenticated, payment_controller_1.createCheckoutSession);
router.get("/membership-status", auth_1.isAuthenticated, payment_controller_1.getPremiumStatus);
exports.default = router;
