import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Action to add a new user
export const UserSliceAction = createAsyncThunk(
    "AddUser/AddUser",
    async (data, { rejectWithValue }) => {
        try {
            // Send a POST request to the server to add a new user
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/add-user`, {
                method: "POST",
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resJson = await response.json();

            // Handle errors
            if (!response.ok) {
                const errorMessage = resJson && resJson.message;
                if (errorMessage) {
                    throw new Error(errorMessage);
                }
            }

            return resJson;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Action to edit an existing user
export const UserEditSliceAction = createAsyncThunk(
    "EditUser/EditUser",
    async (data, { rejectWithValue }) => {
        try {
            // Send a POST request to the server to edit a user
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/add-user`, {
                method: "POST",
                body: JSON.stringify({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resJson = await response.json();

            // Handle errors
            if (!response.ok) {
                const errorMessage = resJson && resJson.message;
                if (errorMessage) {
                    throw new Error(errorMessage);
                }
            }

            return resJson;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Action to get all users
export const GetAllUserSliceAction = createAsyncThunk(
    "GetAllUser/GetAllUser",
    async (_, { rejectWithValue }) => {
        try {
            // Send a GET request to the server to get all users
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get-all-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resJson = await response.json();

            // Handle errors
            if (!response.ok) {
                const errorMessage = resJson && resJson.message;
                if (errorMessage) {
                    throw new Error(errorMessage);
                }
            }

            return resJson;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Initial state for the reducer
const initialState = {
    loading: false,
    result: [],
    count: null,
    error: null,
};

// Reducer for adding users
const AddUserReducer = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // Reducer cases for adding a user
        builder.addCase(UserSliceAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UserSliceAction.fulfilled, (state, action) => {
            state.loading = false;
            state.count = action.payload.count;
            state.result.push(action.payload.data);
            state.error = null;
            toast.success(action.payload.message); // Show success toast
        });
        builder.addCase(UserSliceAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload); // Show error toast
        });

        // Reducer cases for editing a user
        builder.addCase(UserEditSliceAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UserEditSliceAction.fulfilled, (state, action) => {
            state.loading = false;
            state.result = state.result.map((item) => {
                return (item._id === action.payload.data._id ? action.payload.data : item);
            });
            state.count = action.payload.count;
            state.error = null;
            toast.success(action.payload.message); // Show success toast
        });
        builder.addCase(UserEditSliceAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error(action.payload); // Show error toast
        });

        // Reducer cases for getting all users
        builder.addCase(GetAllUserSliceAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllUserSliceAction.fulfilled, (state, action) => {
            state.loading = false;
            state.result = action.payload.data;
            state.count = action.payload.count;
            state.error = null;
        });
        builder.addCase(GetAllUserSliceAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default AddUserReducer.reducer;
