import { createSlice } from "@reduxjs/toolkit";

export const branchSlice = createSlice({
    name: "branch",
    initialState: {
        branches: [],
    },
    reducers: {
        addBranch: (state, action) => {
            state.branches = action.payload;
        },
        deleteBranch: (state, action) => {
            state.branches = state.branches.filter(({ _id }) => _id!== action.payload);
        },
    },
});

export const { addBranch, deleteBranch } = branchSlice.actions;