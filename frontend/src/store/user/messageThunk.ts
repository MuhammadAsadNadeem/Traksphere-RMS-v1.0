import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { ContactFormType, MessageType } from "../../types/message.types";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import toaster from "../../utils/toaster";

export enum MessageApiPath {
    SEND_MESSAGE = "api/auth/send-message",
    GET_ALL_MESSAGES = "api/auth/get-messages",
    DELETE_MESSAGE = "api/auth/delete-message",
}

export const getAllMessages = createAsyncThunk<MessageType[], void, { rejectValue: string }>(
    MessageApiPath.GET_ALL_MESSAGES,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get<MessageType[]>(MessageApiPath.GET_ALL_MESSAGES);
            console.log("API response:", res.data);
            if (res.status === HttpStatusCode.Ok) {
                return res.data; // Return the array directly
            }
            return rejectWithValue("Failed to get messages");
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const sendMessage = createAsyncThunk(MessageApiPath.SEND_MESSAGE, async (values: ContactFormType, { rejectWithValue }) => {
    try {
        const res = await instance.post(MessageApiPath.SEND_MESSAGE, values)
        if (res.status === HttpStatusCode.Ok) {
            toaster.success(res.data.message)
            return res.data.data
        }
    } catch (error) {
        return rejectWithValue(errorReturn(error))
    }
})


export const deleteMessageById = createAsyncThunk<string, string, { rejectValue: string }>(
    MessageApiPath.DELETE_MESSAGE,
    async (messageId, { rejectWithValue }) => {
        try {
            const res = await instance.delete<{ message: string }>(MessageApiPath.DELETE_MESSAGE, {
                params: { id: messageId },
            });
            if (res.status === HttpStatusCode.Ok) {
                toaster.success(res.data.message);
                return messageId;
            }
            return rejectWithValue("Failed to delete message");
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export default {
    getAllMessages,
    sendMessage,
    deleteMessageById,
}