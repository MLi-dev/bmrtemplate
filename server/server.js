import express from "express";
import recordRouter from "./routes/records.js";
import cors from "cors";
import xmlparser from "express-xml-bodyparser";

const app = express();
app.use(xmlparser());
app.use(cors());
app.use(express.json());
app.use("/api", recordRouter);
app.get("/", (req, res) => {
	res
		.status(200)
		.send('<h1 style="text-align: center; margin-top: 50px;">MYEIDR API</h1>');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
