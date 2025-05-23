export type LoginType = {
    email: string,
    password: string,
}

export type SignUpPart1Type = {
    email: string,
    password: string,
    confirmPassword: string,
    code: string,
}
export type SignUpPart2Type = {
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string,
}
export type ForgotPasswordType = {
    email: string,
    code: string,
}



