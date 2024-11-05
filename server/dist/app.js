"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("./config/passport");
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );
// app.use(helmet());
// app.use(morgan("dev"));
// app.post(
//   "/payments/webhook",
//   express.raw({ type: "application/json" }),
//   handleWebhook
// );
// app.use(express.json());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI! }),
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use("/auth", authRoute);
// app.use("/contracts", contractsRoute);
// app.use("/payments", paymentsRoute);
// const PORT = 8080;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
