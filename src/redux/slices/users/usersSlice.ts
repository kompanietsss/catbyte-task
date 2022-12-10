import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';
import { ErrorType, StatusType } from '~/redux/types';
import usersApi from '~/services/usersApi';
import { UserType } from './user.types';

export const addUser = createAsyncThunk(
  'users/addUser',
  async (data: UserType) => {
    return { user: data };
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    return { id };
  },
);

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await usersApi.getUsers();
  return response.data;
});

const usersAdapter = createEntityAdapter<UserType>();

const initialState = usersAdapter.getInitialState({
  status: 'pending' as StatusType,
  error: null as ErrorType,
  users: [] as UserType[],
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getUsers.fulfilled,
        (
          state,
          action: PayloadAction<{
            users: UserType[];
          }>,
        ) => {
          const { users } = action.payload;
          state.status = 'succeeded';
          state.error = null;
          state.users = users;
          usersAdapter.setAll(state, users);
        },
      )
      .addCase(
        addUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: UserType;
          }>,
        ) => {
          const { user } = action.payload;

          const users = state.users;
          user.id = Math.random();
          const newUsers = [user, ...users];
          state.users = newUsers;
          usersAdapter.setAll(state, newUsers);
        },
      )
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { id } = action.payload;

        const filteredUsers = state.users.filter(u => u.id !== id);
        usersAdapter.setAll(state, filteredUsers);
        state.users = filteredUsers;
      })

      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

const usersSelector = usersAdapter.getSelectors<RootState>(
  state => state.users,
);

export const selectAllUsers = usersSelector.selectAll;
export const selectUserById = usersSelector.selectById;
export const getUsersStatus = (state: RootState) => state.users.status;
export const getUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
