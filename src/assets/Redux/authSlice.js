import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../../Service/UserService";


export const fetchuserdata = createAsyncThunk(
    'auth/fetchuserdata',
    async(userId ,{rejectWithValue})=>{
        try{
            const res = await UserService.getProfile(userId);
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await UserService.logout();
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  userId: localStorage.getItem('userId') || null,
  email: localStorage.getItem('userEmail') || null,
  profile: {},
  isLoggedIn: !!localStorage.getItem('userId'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { userId, email } = action.payload;
      state.userId = userId;
      state.email = email;
      state.isLoggedIn = true;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', email);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserdata.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchuserdata.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchuserdata.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userId = null;
        state.email = null;
        state.profile = {};
        state.isLoggedIn = false;
        state.status = 'idle';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {loginSuccess} = authSlice.actions;
export default authSlice.reducer;