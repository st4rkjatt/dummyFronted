import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



export const UserSliceAction = createAsyncThunk(
    "AddUser/AddUser",
    async (data, { rejectWithValue }) => {
        try {
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
export const UserEditSliceAction = createAsyncThunk(
    "EditUser/EditUser",
    async (data, { rejectWithValue }) => {
        try {
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

// give me here get all user api Action
export const GetAllUserSliceAction = createAsyncThunk(
    "GetAllUser/GetAllUser",
    async (_, { rejectWithValue }) => {

        try {
                 const response = await fetch(`${process.env.REACT_APP_BASE_URL}/get-all-user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resJson = await response.json();
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

const initialState = {
    loading: false,
    result: [],
    count: null,
    error: null,
    //   token: null,
};
const AddUserReducer = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        /** add user data */
        builder.addCase(UserSliceAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UserSliceAction.fulfilled, (state, action) => {
            console.log(action.payload.data, "action.payload.data")
            console.log(current(state), "sta1")
            state.loading = false;
            state.count = action.payload.count;
            state.result.push(action.payload.data)
            console.log(current(state), "sta2")
            state.error = null;

            toast.success(action.payload.message);
        });
        builder.addCase(UserSliceAction.rejected, (state, action) => {
            console.log(action, "error");
            state.loading = false;
            state.error = action.payload
            toast.error(action.payload);
        });
        /** edit user data */
        builder.addCase(UserEditSliceAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(UserEditSliceAction.fulfilled, (state, action) => {

            state.loading = false;
            state.result = state.result.map((item) => {
                return (item._id === action.payload.data._id ? action.payload.data : item)
            });
            state.count = action.payload.count;
            state.error = null;
            toast.success(action.payload.message);
        });
        builder.addCase(UserEditSliceAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
            toast.error(action.payload);
        })
        /** get all users data */
        builder.addCase(GetAllUserSliceAction.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(GetAllUserSliceAction.fulfilled, (state, action) => {
            console.log(action.payload, "action.payload.data")
            state.loading = false;
            state.result = action.payload.data;
            state.count = action.payload.count;
            state.error = null;
        });
        builder.addCase(GetAllUserSliceAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        });

    },
});

export default AddUserReducer.reducer;
