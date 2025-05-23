import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import locationService from '../services/location.service';
import { broadcastTelemetry } from '../websocket.ts/socket';

const receiveLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = locationService.validateAndStore(req.body);

        console.log("Received telemetry data:", data);
        broadcastTelemetry(data);

        res.status(StatusCodes.OK).json({
            message: 'Telemetry data received.',
            data
        });
    } catch (error) {
        next(error);
    }
};

const getLatestLocation = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = locationService.getLatestLocation();

        if (!data) {
            throw new Error("No telemetry data available yet");
        }

        res.status(StatusCodes.OK).json({
            message: 'Latest telemetry data',
            data
        });
    } catch (error) {
        next(error);
    }
};

export default {
    receiveLocation,
    getLatestLocation
};
