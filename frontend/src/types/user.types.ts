import { DriverType } from "./driver.types";
import { BusStopType } from "./stop.types";

export type UserType = {
    id: string,
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string
    gender: string,
    stopArea: string;
    isSuperUser: boolean;
};

export type ProfileType = {
    id: string,
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string,

}

export type ChangePasswordType = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
}

export type UpdateProfileType = {
    fullName?: string,
    registrationNumber?: string,
    departmentName?: string,
    phoneNumber?: string,
    routeNumber?: string,
    stopArea?: string,
}


export type RouteType = {
    id: string;
    routeName: string;
    routeNumber: string;
    vehicleNumber: string;
    driverId: string;
    driver: DriverType;
    busStops: BusStopType[];
};




