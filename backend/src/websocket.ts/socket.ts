// src/sockets/telemetry.socket.ts
import { Server as HttpServer } from "http";
import WebSocket, { Server as WebSocketServer } from "ws";
import locationService from "../services/location.service"; // Import location service to access latestLocation

let wss: WebSocketServer;

export const initWebSocket = (server: HttpServer) => {
    wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        console.log("WebSocket client connected");

        const latestLocation = locationService.getLatestLocation();
        if (latestLocation) {
            ws.send(JSON.stringify(latestLocation));
        }

        ws.on("close", () => {
            console.log("WebSocket client disconnected");
        });
    });
};

export const broadcastTelemetry = (data: any) => {
    if (!wss) return;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};
