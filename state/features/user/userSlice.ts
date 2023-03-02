import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface UserState {
    loading: boolean
    user: any
    authenticated: boolean
    error: null | string
}

const initialState: UserState = {
    loading: false,
    user: {},
    authenticated: false,
    error: null
}

export const userSlice = createSlice({
    name: 'mainUser',
    initialState,
    reducers: {
        fetchUser: (state) => {
            state.loading = true
            state.user = {}
            state.error = null
        },
        fetchedUser: (state, action: PayloadAction<any>) => {
            
            state.loading = false
            state.user = action.payload
            state.authenticated = true
            state.error = null
        },
        fetchUserFailed: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.user = {}
            state.error = action.payload
        },
        removeUser: (state) => {
            state.loading = false
            state.user = {}
            state.authenticated = false
            state.error = null
        }
    }
})

export const { fetchUser, fetchedUser, fetchUserFailed , removeUser} = userSlice.actions

export default userSlice.reducer