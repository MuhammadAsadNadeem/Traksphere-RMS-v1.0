import { DriverType } from "./driver.types";
import { BusStopType } from "./stop.types";

export type RouteType = {
    id: string;
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driver: DriverType;
    busStops: BusStopType[];
};

export type UpdateRouteType = {
    id: string;
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driverId: string;
    busStopIds: string[];
};

export type AddRouteType = {
    id: string;
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driverId: string;
    busStopIds: string[];
};

export type RouteResponseType = {
    id: string;
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driver: DriverType;
    busStops: BusStopType[];
};

