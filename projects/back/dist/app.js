"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const HeroController_1 = __importDefault(require("./controllers/HeroController"));
require("dotenv").config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
const cors = require("cors");
mongoose_1.default
    .connect(process.env.MONGO_CONNECT_URI)
    .then(() => console.log("Connected to MongoDB", process.env.MONGO_CONNECT_URI))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
app.use(cors());
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api", router);
router.get("/", (req, res) => res.send("API in Vercel"));
router.use("/heroes", HeroController_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
module.exports.handler = (0, serverless_http_1.default)(app);
exports.default = app;
