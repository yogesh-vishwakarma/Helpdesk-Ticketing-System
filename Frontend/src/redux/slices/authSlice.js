import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../services/axios";

export const registerUser = createAsyncThunk(
  "auth/register",

  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", userData);

      return response.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: "Something went wrong",
        },
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/login",

  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", credentials);

      console.log("LOGIN RESPONSE:", response.data);

      return response.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: "Something went wrong",
        },
      );
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/me");

      return response.data.user;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || {
          message: "Authentication failed",
        },
      );
    }
  },
);

const initialState = {
  user: null,
  permissions: [],
  isAuthenticated: false,
  loading: false,
  // Used when checking existing login after refresh
  authLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      // registeUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.permissions = action.payload?.permissions || [];
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Unable to registerUser";
        state.user = null;
        state.permissions = [];
        state.isAuthenticated = false;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.permissions = action.payload?.permissions || [];
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Unable to login";
        state.user = null;
        state.permissions = [];
        state.isAuthenticated = false;
      })

      // GET CURRENT USER
     .addCase(getCurrentUser.pending, (state) =>{
        state.authLoading = true;
       })

      .addCase(getCurrentUser.fulfilled,(state, action)=>{
         state.authLoading = false;
         state.user = action.payload;
         state.permissions =action.payload?.permissions || [];
         state.isAuthenticated = true;
         state.error = null;
       })

      .addCase(getCurrentUser.rejected, (state, action) => {
         state.authLoading = false;
         state.user = null;
         state.permissions = [];
         state.isAuthenticated = false;
         state.error=action.payload?.message || null;
       })
}});

export default authSlice.reducer;
