import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface StoreState {
  loading: boolean
  store: any
  error: null | string
  available: boolean
}

const initialState: StoreState = {
  loading: false,
  store: {},
  error: null,
  available: false,
}

export const storeSlice = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    fetchingStore: (state) => {
      state.loading = true
      state.store = {}
      state.error = null
    },
    addStore: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.store = action.payload
      state.available = true
      state.error = null
    },
    updateStore: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.store = action.payload
      state.available = true
      state.error = null
    },
    fetchStoreFailed: (state, action: PayloadAction<null | string>) => {
      state.loading = false
      state.store = {}
      state.store = action.payload
    },
  },
})

export const { updateStore, fetchingStore, addStore, fetchStoreFailed } =
  storeSlice.actions

export default storeSlice.reducer
