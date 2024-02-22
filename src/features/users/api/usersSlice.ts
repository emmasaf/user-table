import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICountry, IFormInput, IPaginateUsers, IUserProps, IUsersSliceProps } from "../../../entities/interfaces";
import axios from "axios";
import { api, getCountriesURL, getUsersURL } from "./http";


const initialState = {
  users: [],
  countries: [],
  user: null,
  formModalState: false,
  totalItems: 0,
  itemsPerPage: 0,
} as IUsersSliceProps

export const getCountries = createAsyncThunk('users/getCountries', async () => {
  const response = await axios.get<ICountry[]>(getCountriesURL);
  return response.data;
});

// _page=2&_per_page=2
export const getUsers = createAsyncThunk('users/getUsers', async (page:number ) => {
  const response = await axios.get<IPaginateUsers>(`${api}${getUsersURL}?_page=${page}&_per_page=3`);
  return response.data;
});

export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<IUserProps>(`${api}/users/${userId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async ({ userData }: { userData: IFormInput }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}/users`, userData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${api}/users/${userId}`);
      return userId;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ userId, userData }: { userId: string; userData: IUserProps }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${api}/users/${userId}`, userData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async ({ userId, status }: { userId: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${api}/users/${userId}`, { status });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    formModalHandler(state) {
      state.formModalState = !state.formModalState
    },
    cleanForm(state) {
      state.user = {
        first_name:"",
        last_name:"",
        avatar:"",
        phone:"",
        mail:"",
        country:"Armenia"
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCountries.fulfilled, (state, action) => {
        let filteredArr = action.payload.map(({ idd, name }) => ({ idd, name }));
        state.countries = filteredArr
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.totalItems = action.payload.items
        state.itemsPerPage = 3
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = null
      })
  }
})
export const { formModalHandler, cleanForm } = usersSlice.actions;
export default usersSlice.reducer
