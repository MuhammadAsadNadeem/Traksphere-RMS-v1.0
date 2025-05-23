import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import config from "./config";
import userRoutes from "./routers/user.route";
import authRoutes from "./routers/auth.route";
import adminRoutes from "./routers/admin.route";

import { errorHandler } from "./utils/errorHandler";
import locationRoutes from "./routers/location.routes";
import { initWebSocket } from "./websocket.ts/socket";


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/location", locationRoutes);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const error = errorHandler(err);
  res.status(error.status).json(error);
});


initWebSocket(server);


const PORT = config.port;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`POST telemetry to http://localhost:${PORT}/api/location/send-location`);
});
