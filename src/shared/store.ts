import { configureStore  } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import usersReducer from '../features/users/api/usersSlice'
import notificationReducer from '../features/noticiations/api/notificationSlice'


const store = configureStore({
  reducer: {
    users:usersReducer,
    notifications:notificationReducer
  },
  // middleware: () => new Tuple(thunk),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof store.getState>

export default store