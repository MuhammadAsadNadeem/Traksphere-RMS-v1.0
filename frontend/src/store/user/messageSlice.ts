import { createSlice } from "@reduxjs/toolkit";
import { MessageType } from "../../types/message.types";
import { deleteMessageById, getAllMessages, sendMessage } from "./messageThunk";

type MessageSliceType = {
    message: MessageType[];
    isLoading: boolean;
    error: string | null;
};

const initialState: MessageSliceType = {
    message: [],
    isLoading: false,
    error: null,
};

const messageSlice = createSlice({
    name: "messageSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                console.log("Fulfilled action payload:", action.payload);
                state.message = action.payload;
                state.isLoading = false;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch messages";
            })
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = [action.payload, ...state.message];
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = typeof action.payload === "string" ? action.payload : "Failed to send message";
            })
            .addCase(deleteMessageById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteMessageById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = state.message.filter((msg) => msg.id !== action.payload);
            })
            .addCase(deleteMessageById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to delete message";
            });
    },
});

export default messageSlice.reducer;