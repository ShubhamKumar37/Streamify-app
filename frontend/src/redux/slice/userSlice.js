import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        
    },
});

export const { setUser, setIsLoading } = userSlice.actions;

export default userSlice.reducer;
