import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./features/user/userSlice"
import storeReducer from "./features/store/storeSlice"
import squareReducer from "./features/square/squareSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    store: storeReducer,
    square: squareReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
