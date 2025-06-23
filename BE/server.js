import express from "express";
import { DATABASE_URL } from './src/common/constant/app.constant';
import prisma from "./src/common/prisma/init.prisma";
import rootRouter from "./src/routers/root.router";
import cors from "cors";

const app = express();


app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
}));
app.use(express.static("."))

app.use(rootRouter);

app.listen(3069, () => {
    console.log("Server running on port http://localhost:3069");
})
