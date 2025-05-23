import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required."),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required."),
});

export const signUpSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required."),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required."),
    code: Yup.string()
        .matches(/^\d{6}$/, "Code must be 6 digits")
        .required("Code is required."),
});

export const userProfileSchema = Yup.object({
    fullName: Yup.string().matches(/^[aA-zZ\s]+$/, "Name should only contain letters and spaces.").required("Full Name is required."),
    departmentName: Yup.string().required("Department Name is required."),
    registrationNumber: Yup.string().matches(/^\d{4}[A-Z]{2}\d{3}$/, "Registration number must be in format: XXXXXX").required("Registration Number is required."),
    phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits.")
        .required("Phone number is required."),
    gender: Yup.string().required("Please select a gender."),
    routeNumber: Yup.string().required("Bus number is required."),
    stopArea: Yup.string().matches(/^[A-Za-z\s]+$/, "Stop area must only contain letters, and spaces").required("Stop Area is required."),
});
export const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required."),
    code: Yup.string()
        .matches(/^\d{6}$/, "Code must be 6 digits")
        .required("Code is required."),
});


export const changePasswordSchema = Yup.object({
    currentPassword: Yup.string()
        .min(8, "Current password must be at least 8 characters long")
        .required("Current password is required."),
    newPassword: Yup.string()
        .min(8, "New password must be at least 8 characters long")
        .required("New password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Confirm password is required."),
});

export const driverSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required."),
    busNumber: Yup.string().required("Bus Number is required"),
    cnicNumber: Yup.string()
        .length(13, "CNIC Number must be 13 digits")
        .matches(/^[0-9]+$/, "CNIC Number must contain only digits")
        .required("CNIC Number is required"),
    contactNumber: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits.")
        .required("Phone number is required."),
    routeNumber: Yup.string().required("Bus number is required."),

});

export const updateProfileSchema = Yup.object({
    fullName: Yup.string().matches(/^[aA-zZ\s]+$/, "Name should only contain letters and spaces.").required("Full Name is required."),
    departmentName: Yup.string().required("Department Name is required."),
    registrationNumber: Yup.string().matches(/^\d{4}[A-Z]{2}\d{3}$/, "Registration number must be in format: XXXXXX").required("Registration Number is required."),
    phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits.")
        .required("Phone number is required."),
    routeNumber: Yup.string().required("Bus number is required."),
    stopArea: Yup.string().matches(/^[A-Za-z\s]+$/, "Stop area must only contain letters, and spaces").required("Stop Area is required."),
});



export const contactFormSchema = Yup.object({
    fullName: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Name should only contain letters and spaces.")
        .required("Full Name is required."),
    email: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
    message: Yup.string()
        .matches(/^[A-Za-z0-9\s.,!?'"-]+$/, "Message contains invalid characters.")
        .required("Message is required."),
});