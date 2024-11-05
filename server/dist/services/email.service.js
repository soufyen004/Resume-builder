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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPremiumConfirmationEmail = exports.resend = void 0;
const resend_1 = require("resend");
const RESEND_API_KEY = process.env.RESEND_API_KEY;
exports.resend = new resend_1.Resend(RESEND_API_KEY);
const sendPremiumConfirmationEmail = (userEmail, userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: userEmail,
            subject: "Welcome to Premium",
            html: `<p>Hi ${userName},</p><p>Welcome to Premium. You're now a Premium user!</p>`,
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.sendPremiumConfirmationEmail = sendPremiumConfirmationEmail;
