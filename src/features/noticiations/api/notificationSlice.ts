import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { INotificationSliceProps } from "../../../entities/interfaces";

const initialState = {
message:null,
type:null,
} as INotificationSliceProps

export const triggerNotification = createAsyncThunk(
  'notification/trigger',
  async ({ message, type }: { message: string; type: 'success' | 'error' }, { dispatch }) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000); // Adjust time as needed
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
})
export const {setNotification, clearNotification} = notificationSlice.actions;
export const selectNotification = (state:any) => state.notifications;

export default notificationSlice.reducer
