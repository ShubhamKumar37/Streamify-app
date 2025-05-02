import api from '../../lib/axios';
import { toastHandler } from '../../util/toastHandler';
import { setUser } from '../slice/userSlice';

export const getMe = (navigate) => {
    return async (dispatch) => {
        const response = await toastHandler(api.get("/auth/me"), 'Loading...', 'User fetched successfully', 'Failed to fetch user');
        console.log("This is the response = ", response);
        if (response) {
            dispatch(setUser(response.data.data));
            navigate('/');
        }
    }
}

export const signup = (data, navigate) => {
    return async () => {
        const response = await toastHandler(api.post("/auth/signup", data), 'Signing up...', 'Signed up successfully', 'Failed to sign up');

        if (response.status === 201) navigate('/login');
    }
}

export const login = (data, navigate) => {
    return async (dispatch) => {
        const response = await toastHandler(api.post("/auth/login", data), 'Logging in...', 'Logged in successfully', 'Failed to login');

        if (response.status === 200) {
            dispatch(setUser(response.data.data));
            navigate('/');
        }
    }
}

export const logout = (navigate) => {
    return async () => {
        const response = await toastHandler(api.post("/auth/logout"), 'Logging out...', 'Logged out successfully', 'Failed to logout');

        if (response.status === 200) {
            dispatch(setUser(null));
            navigate('/login');
        }
    }
}