import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../../services/user.service';
import { logout } from './authSlice';

export const fetchUserById = createAsyncThunk(
  'user/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userService.getUserById(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(userId, userData);
      if (response.status && response.data) {
        return response.data;
      }
      return rejectWithValue(response.message || 'Failed to update user data');
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'user/deleteAccount',
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await userService.deleteUser(userId);
      dispatch(logout());
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  userData: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserErrors: (state) => {
      state.error = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.userData = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.deleteLoading = false;
        state.userData = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
      });
  },
});

export const { clearUserErrors } = userSlice.actions;
export default userSlice.reducer;
