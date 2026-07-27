import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authApi from '../../Utils/authApi';

// Async thunks
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const data = await authApi.loginUser(credentials);
    return data; // success message, OTP sent
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyOtpThunk = createAsyncThunk('auth/verifyOtp', async (credentials, thunkAPI) => {
  try {
    const data = await authApi.verifyOtp(credentials);
    return data; // success message, cookies set
  } catch (error) {
    const message = error.response?.data?.message || 'Verification failed';
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authApi.logoutUser();
    return null;
  } catch (error) {
    return null;
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
  try {
    const data = await authApi.getProfile();
    // Assuming backend apiResponse returns { data: userObject, message: ... }
    return data.data || data; 
  } catch (error) {
    return thunkAPI.rejectWithValue('Session expired');
  }
});

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthStatus: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user || null;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login (OTP Step)
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        // Do NOT set isAuthenticated here because OTP must be verified first
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Verify OTP (Finalize Login)
      .addCase(verifyOtpThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true; // successfully verified!
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isInitialized = true;
      });
  },
});

export const { clearError, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
