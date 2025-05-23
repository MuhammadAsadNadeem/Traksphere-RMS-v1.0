export type DriverType = {
    id?: string;
    fullName: string;
    phoneNumber: string;
    cnicNumber: string;
}
export type UpdateDriverType = {
    id: string,
    fullName: string;
    phoneNumber: string;
    cnicNumber: string;
}

export type DriverResponseType = {
    id: string,
    fullName: string;
    phoneNumber: string;
    cnicNumber: string;
}