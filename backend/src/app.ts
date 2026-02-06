import express, { Request, Response } from "express";
import cors from "cors";
import menuRoutes from "./routes/menu.routes"
import orderRoutes from "./routes/order.routes"
import path from "path";
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./docs/swagger"



const app = express();

app.use(cors({
  origin: ["https://raftlabs-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));

app.get("/health", (_req: Request, res: Response) => {
res.status(200).json({ status: "ok" })
})

app.use("/api/menu", menuRoutes)
app.use("/api/orders", orderRoutes)


app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app;
