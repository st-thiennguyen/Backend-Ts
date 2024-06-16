import express, { urlencoded, type Express } from "express";
import "dotenv/config";
import router from "./routes/routes";
import cors from "cors";
const app: Express = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/v1", router);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
