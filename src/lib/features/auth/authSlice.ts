import { User } from "@/utils/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { LoginData } from "@/utils/types/login";

export interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  token: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginData, thunkAPI) => {
    try {
      const payload = await authService.login(user);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (user: User, thunkAPI) => {
    try {
      const payload = await authService.signup(user);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const updateProfile = createAsyncThunk(
  "auth/profile",
  async (user: User, thunkAPI) => {
    try {
      const payload = await authService.updateProfile(user);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;
