import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./user/userSlice";
import adminSlice from "./user/adminSlice"
import messageSlice from "./user/messageSlice";
const store = configureStore({
    reducer: {
        userSlice,
        adminSlice,
        messageSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type AppDispathchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;

export default store;