import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../utils/errorHandler';

interface SensorData {
    busNo: string;
    latitude: number;
    longitude: number;
    condition: string;
    signal_strength: number;
    error: string;
    acceleration: string;
    speed: number;
    internal_battery_percent: number;
    external_battery_percent: number;
}

class LocationService {
    private latestLocation: SensorData | null = null;

    private isValidSensorData(data: any): boolean {
        return (
            typeof data.busNo === 'string' &&
            typeof data.latitude === 'number' &&
            typeof data.longitude === 'number' &&
            typeof data.internal_battery === 'number' &&
            typeof data.external_battery === 'number' &&
            typeof data.condition === 'string' &&
            typeof data.signal_strength === 'number' &&
            typeof data.error === 'string' &&
            typeof data.acceleration === 'string' &&
            typeof data.speed === 'number'
        );
    }

    private calculateBatteryPercentage(voltage: number, maxVoltage: number): number {
        return Math.round((voltage / maxVoltage) * 100);
    }

    validateAndStore(data: any): SensorData {
        if (!this.isValidSensorData(data)) {
            throw new HttpError('Invalid telemetry data format', StatusCodes.BAD_REQUEST);
        }

        const internalBatteryPercent = this.calculateBatteryPercentage(data.internal_battery, 8.4);
        const externalBatteryPercent = this.calculateBatteryPercentage(data.external_battery, 16.4);

        const locationData: SensorData = {
            busNo: data.busNo,
            latitude: data.latitude,
            longitude: data.longitude,
            condition: data.condition,
            signal_strength: data.signal_strength,
            error: data.error,
            acceleration: data.acceleration,
            speed: data.speed,
            internal_battery_percent: internalBatteryPercent,
            external_battery_percent: externalBatteryPercent
        };

        this.latestLocation = locationData;
        return locationData;
    }

    getLatestLocation(): Partial<SensorData> | null {
        if (!this.latestLocation) return null;

        const {
            busNo,
            latitude,
            longitude,
            signal_strength,
            error,
            acceleration,
            speed,
            internal_battery_percent,
            external_battery_percent
        } = this.latestLocation;

        return {
            busNo,
            latitude,
            longitude,
            signal_strength,
            error,
            acceleration,
            speed,
            internal_battery_percent,
            external_battery_percent
        };
    }
}

export default new LocationService();
