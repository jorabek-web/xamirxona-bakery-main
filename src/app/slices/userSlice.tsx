import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: 'Islombek',
        email: 'islombek@example.com',
        id: 1,
    },
    reducers: {
        updateUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
})

export const { updateUser } = userSlice.actions;