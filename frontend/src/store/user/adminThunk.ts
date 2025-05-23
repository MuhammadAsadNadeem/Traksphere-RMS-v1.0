import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";
import { HttpStatusCode } from "axios";
import { errorReturn } from "../../utils/errorReturn";
import { setCounts, setLoading, setUsers } from "./adminSlice";
import { CountsResponse, UpdateUserType, UserResponse } from "../../types/admin.types";
import toaster from "../../utils/toaster";
import { DriverType, UpdateDriverType } from "../../types/driver.types";
import { BusStopResponse, BusStopType } from "../../types/stop.types";
import { AddRouteType, UpdateRouteType } from "../../types/route.types";




export enum AdminApiPathEnum {
    COUNTS = "api/admin/get-counts",
    GET_BUS_STOPS = "api/admin/get-stops",
    GET_USERS = "api/admin/get-users",
    UPDATE_USER = "api/admin/update-user",
    DELETE_USER = "api/admin/delete-user",
    ADD_Driver = "api/admin/add-driver",
    GET_DRIVERS = "api/admin/get-drivers",
    UPDATE_DRIVER = "api/admin/update-driver",
    DElETE_DRIVER = "api/admin/delete-driver",
    ADD_STOP = "api/admin/add-stop",
    UPDATE_STOP = "api/admin/update-stop",
    DElETE_STOP = "api/admin/delete-stop",
    GET_ROUTES = "api/admin/get-routes",
    ADD_ROUTE = "api/admin/add-route",
    UPDATE_ROUTE = "api/admin/update-route",
    DElETE_ROUTE = "api/admin/delete-route",
}


export const getCounts = createAsyncThunk(
    AdminApiPathEnum.COUNTS,
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            const res = await instance.get<CountsResponse>(AdminApiPathEnum.COUNTS);
            if (res.status === HttpStatusCode.Ok) {
                dispatch(setCounts(res.data));
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        } finally {
            dispatch(setLoading(false));
        }
    }
);



export const getAllUsers = createAsyncThunk(
    AdminApiPathEnum.GET_USERS,
    async (params: Partial<UserResponse>, { dispatch, rejectWithValue }) => {
        dispatch(setLoading(true));
        try {
            const res = await instance.get<UserResponse[]>(AdminApiPathEnum.GET_USERS, { params });
            if (res.status === HttpStatusCode.Ok) {
                const users: UserResponse[] = res.data.map((user) => ({
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    registrationNumber: user.registrationNumber,
                    departmentName: user.departmentName,
                    phoneNumber: user.phoneNumber,
                    routeNumber: user.routeNumber,
                    gender: user.gender,
                    stopArea: user.stopArea,
                }));
                dispatch(setUsers(users));
                return users;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        } finally {
            dispatch(setLoading(false));
        }
    }
);


export const editUserById = createAsyncThunk(
    AdminApiPathEnum.UPDATE_USER,
    async ({ userId, values }: { userId: string; values: UpdateUserType }, { rejectWithValue }) => {
        try {
            const res = await instance.put(AdminApiPathEnum.UPDATE_USER, values, {
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const deleteUserById = createAsyncThunk(
    AdminApiPathEnum.DELETE_USER,
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await instance.delete(AdminApiPathEnum.DELETE_USER, {
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return userId;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const addNewDriver = createAsyncThunk(AdminApiPathEnum.ADD_Driver,
    async (values: DriverType, { rejectWithValue }) => {
        try {
            const res = await instance.post(AdminApiPathEnum.ADD_Driver, values);
            if (res.status === HttpStatusCode.Ok) {
                toaster.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);


export const getAllDrivers = createAsyncThunk(AdminApiPathEnum.GET_DRIVERS,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get(AdminApiPathEnum.GET_DRIVERS)
            if (res.status === HttpStatusCode.Ok) {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const editDriverById = createAsyncThunk(
    AdminApiPathEnum.UPDATE_DRIVER,
    async ({ userId, values }: { userId: string; values: UpdateDriverType }, { rejectWithValue }) => {
        try {
            const res = await instance.put(AdminApiPathEnum.UPDATE_DRIVER, values, {
                params: { id: userId },
            });

            if (res.status === HttpStatusCode.Ok) {
                return res.data?.data;
            } else {

                throw new Error("Failed to update driver");
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const deleteDriverById = createAsyncThunk(
    AdminApiPathEnum.DElETE_DRIVER,
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await instance.delete(AdminApiPathEnum.DElETE_DRIVER, {
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return userId;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const getAllBusStops = createAsyncThunk<BusStopResponse[]>(
    AdminApiPathEnum.GET_BUS_STOPS,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get<BusStopResponse[]>(AdminApiPathEnum.GET_BUS_STOPS);
            if (res.status === HttpStatusCode.Ok) {
                return res.data.map(stop => ({
                    id: stop.id,
                    stopName: stop.stopName,
                    latitude: stop.latitude,
                    longitude: stop.longitude,
                }));
            }
            return rejectWithValue('Failed to get bus stops');
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);


export const addNewStop = createAsyncThunk(AdminApiPathEnum.ADD_STOP,
    async (values:

        BusStopType, { rejectWithValue }) => {
        try {
            const res = await instance.post(AdminApiPathEnum.ADD_STOP, values);
            console.log(res);
            if (res.status === HttpStatusCode.Ok) {
                toaster.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

// export const editStopById = createAsyncThunk(
//     AdminApiPathEnum.UPDATE_STOP,
//     async ({ userId, values }: { userId: string; values: UpdateBusStopType }, { rejectWithValue }) => {
//         try {
//             const res = await instance.put(AdminApiPathEnum.UPDATE_STOP, values, {
//                 params: { id: userId },
//             });
//             if (res.status === HttpStatusCode.Ok) {
//                 return res.data.data;
//             }
//         } catch (error) {
//             return rejectWithValue(errorReturn(error));
//         }
//     }
// );

export const deleteStopById = createAsyncThunk(
    AdminApiPathEnum.DElETE_STOP,
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await instance.delete(AdminApiPathEnum.DElETE_STOP, {
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return userId;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const getAllRoutes = createAsyncThunk(AdminApiPathEnum.GET_ROUTES,
    async (_, { rejectWithValue }) => {
        try {
            const res = await instance.get(AdminApiPathEnum.GET_ROUTES)

            if (res.status === HttpStatusCode.Ok) {
                return res.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const addNewRoute = createAsyncThunk(AdminApiPathEnum.ADD_ROUTE,
    async (values: AddRouteType, { rejectWithValue }) => {
        try {
            const res = await instance.post(AdminApiPathEnum.ADD_ROUTE, values);
            if (res.status === HttpStatusCode.Ok) {
                toaster.success(res.data.message);
                return res.data.data;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export const editRouteById = createAsyncThunk(
    AdminApiPathEnum.UPDATE_ROUTE,
    async ({ userId, values }: { userId: string; values: UpdateRouteType }, { rejectWithValue }) => {
        try {
            const res = await instance.put(AdminApiPathEnum.UPDATE_ROUTE, values, {
                params: { id: userId },
            });

            if (res.status === HttpStatusCode.Ok) {
                return res.data?.data;
            } else {

                throw new Error("Failed to update Route");
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);


export const deleteRouteById = createAsyncThunk(
    AdminApiPathEnum.DElETE_ROUTE,
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await instance.delete(AdminApiPathEnum.DElETE_ROUTE, {
                params: { id: userId },
            });
            if (res.status === HttpStatusCode.Ok) {
                return userId;
            }
        } catch (error) {
            return rejectWithValue(errorReturn(error));
        }
    }
);

export default {
    getCounts,
    getAllUsers,
    editUserById,
    deleteUserById,
    addNewDriver,
    getAllDrivers,
    editDriverById,
    deleteDriverById,
    getAllBusStops,
    addNewStop,
    // editStopById,
    deleteStopById,
    getAllRoutes,
    addNewRoute,
    editRouteById,
    deleteRouteById,



}