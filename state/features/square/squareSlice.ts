import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface SquareState {
  loading: boolean
  squareCreds: {}
  error: null | string
}

const initialState: SquareState = {
  loading: false,
  squareCreds: {},
  error: null,
}

export const squareCredsSlice = createSlice({
  name: "squareCreds",
  initialState,
  reducers: {
    fetchSquareCreds: (state) => {
      state.loading = true
      state.squareCreds = {}
      state.error = null
    },
    addSquareCreds: (state, action: PayloadAction<{}>) => {
      state.loading = false
      state.squareCreds = action.payload
      state.error = null
    },
    fetchedSquareCreds: (state, action: PayloadAction<any>) => {
      state.loading = false
      state.squareCreds = action.payload
      state.error = null
    },
    failedFetchSquareCreds: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.squareCreds = {}
      state.error = action.payload
    },
  },
})

export const {
  fetchSquareCreds,
  fetchedSquareCreds,
  addSquareCreds,
  failedFetchSquareCreds,
} = squareCredsSlice.actions

export default squareCredsSlice.reducer
