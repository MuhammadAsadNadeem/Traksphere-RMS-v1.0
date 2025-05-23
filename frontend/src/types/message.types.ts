export type MessageType = {
    id: string,
    fullName: string,
    email: string,
    message: string,
    createdAt: string;

};

export type MessageResponse = {
    id: string;
    fullName: string;
    email: string;
    message: string;
    createdAt: string;
}


export type ContactFormType = {
    fullName: string;
    email: string;
    message: string;
}
