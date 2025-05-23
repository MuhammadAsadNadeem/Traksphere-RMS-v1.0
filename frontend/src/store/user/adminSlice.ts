import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getCounts, getAllBusStops, getAllUsers, getAllDrivers, addNewDriver, editDriverById, deleteDriverById, addNewStop, deleteStopById, getAllRoutes, addNewRoute, editRouteById, deleteRouteById, // editStopById,
} from "./adminThunk";
import { CountsResponse, UserResponse } from "../../types/admin.types";
import { BusStopResponse } from "../../types/stop.types";
import { DriverResponseType } from "../../types/driver.types";
import { RouteResponseType } from "../../types/route.types";

interface AdminState {
    counts: CountsResponse | null | undefined;
    busStops: BusStopResponse[];
    allUsers: UserResponse[] | undefined;
    drivers: DriverResponseType[];
    routes: RouteResponseType[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    counts: null,
    busStops: [],
    allUsers: [],
    drivers: [],
    routes: [],
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setCounts: (state, action: PayloadAction<CountsResponse>) => {
            state.counts = action.payload;
        },
        setBusStops: (state, action: PayloadAction<BusStopResponse[]>) => {
            state.busStops = action.payload;
        },
        setUsers: (state, action: PayloadAction<UserResponse[]>) => {
            state.allUsers = action.payload;
        },
        setDrivers: (state, action: PayloadAction<DriverResponseType[]>) => {
            state.drivers = action.payload;
        },
        setRoutes: (state, action: PayloadAction<RouteResponseType[]>) => {
            state.routes = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCounts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCounts.fulfilled, (state, action) => {
                state.loading = false;
                state.counts = action.payload;
            })
            .addCase(getCounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllDrivers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDrivers.fulfilled, (state, action) => {
                state.drivers = action.payload;
                state.loading = false;
            })
            .addCase(getAllDrivers.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addNewDriver.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewDriver.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers.push(action.payload);
            })
            .addCase(addNewDriver.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editDriverById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editDriverById.fulfilled, (state, action) => {
                if (!action.payload?.id) return;
                const index = state.drivers.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.drivers[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(editDriverById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteDriverById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDriverById.fulfilled, (state, action) => {
                state.drivers = state.drivers.filter(driver => driver.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteDriverById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(getAllBusStops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBusStops.fulfilled, (state, action: PayloadAction<BusStopResponse[]>) => {
                state.loading = false;
                state.busStops = action.payload;
            })

            .addCase(getAllBusStops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addNewStop.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewStop.fulfilled, (state, action) => {
                state.busStops.push(action.payload);
                state.loading = false;
            })
            .addCase(addNewStop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // .addCase(editStopById.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(editStopById.fulfilled, (state, action) => {
            //     if (!action.payload?.id) return;
            //     const index = state.busStops.findIndex(d => d.id === action.payload.id);
            //     if (index !== -1) {
            //         state.drivers[index] = action.payload;
            //     }
            //     state.loading = false;
            // })
            // .addCase(editStopById.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // })
            .addCase(deleteStopById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStopById.fulfilled, (state, action) => {
                state.busStops = state.busStops.filter(stop => stop.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteStopById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllRoutes.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllRoutes.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.routes = action.payload;
                } else {
                    state.routes = [];
                }
            })
            .addCase(getAllRoutes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addNewRoute.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewRoute.fulfilled, (state, action) => {
                state.loading = false;
                state.drivers.push(action.payload);
            })
            .addCase(addNewRoute.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(editRouteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editRouteById.fulfilled, (state, action) => {
                if (!action.payload?.id) return;
                const index = state.drivers.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.drivers[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(editRouteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteRouteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRouteById.fulfilled, (state, action) => {
                state.drivers = state.drivers.filter(driver => driver.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteRouteById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const { setLoading, setCounts, setBusStops, setUsers, setDrivers, setError } = adminSlice.actions;
export default adminSlice.reducer;