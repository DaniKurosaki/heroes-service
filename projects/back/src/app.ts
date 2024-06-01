import serverless from "serverless-http";
import express from "express";
import mongoose from "mongoose";
import HeroController from "./controllers/HeroController";

require("dotenv").config();

const app = express();
const router = express.Router();

mongoose
	.connect(process.env.MONGO_CONNECT_URI!)
	.then(() => console.log("Connected to MongoDB", process.env.MONGO_CONNECT_URI!))
	.catch((err) => console.error("Could not connect to MongoDB:", err));

app.use(express.json());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.use("/api", router);

router.get("/", (req, res) => res.send("API in Vercel"));
router.use("/heroes", HeroController);

const port = process.env.PORT!;
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

module.exports.handler = serverless(app);
export default app;
