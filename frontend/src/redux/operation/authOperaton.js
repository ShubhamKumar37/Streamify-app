import api from '../../lib/axios';
import { toastHandler } from '../../util/toastHandler';
import { setUser } from '../slice/userSlice';

export const getMe = (navigate) => {
  return async (dispatch) => {
    const response = await toastHandler(
      api.get("/auth/me"),
      'Loading...',
      'User fetched successfully',
      'Failed to fetch user'
    );
    console.log("This is the response = ", response);

    if (response.status === 200) {
      dispatch(setUser(response.data.data));
      const currentPath = window.location.pathname;
      if (currentPath !== '/') {
        navigate('/');
      }
    }
  };
};


export const signup = (data, setIsPending, navigate) => {
  return async () => {
    setIsPending(true);
    const response = await toastHandler(api.post("/auth/register", data), 'Signing up...', 'Signed up successfully', 'Failed to sign up');
    setIsPending(false);
    console.log("This is the response = ", response);
    if (response.status === 200 || (response.status === 400 && response.data.message === "User already exists")) navigate('/login');
  }
}

export const onboard = (data, setIsPending, navigate) => {
  return async (dispatch) => {
    setIsPending(true);
    const response = await toastHandler(api.post("/auth/onboard", data), 'Onboarding...', 'Onboarded successfully', 'Failed to onboard');
    setIsPending(false);
    if (response.status === 200) {
      setTimeout(() => {
        dispatch(getMe(navigate));
      }, 500);
    }
  }
}

export const login = (data, setIsPending, navigate) => {
  return async (dispatch) => {
    setIsPending(true);
    const response = await toastHandler(api.post("/auth/login", data), 'Logging in...', 'Logged in successfully', 'Failed to login');
    setIsPending(false);

    if (response.status === 200) {
      dispatch(setUser(response.data.data));
      navigate('/onboard');
    }
  }
}

export const logout = () => {
  return async () => {
    const response = await toastHandler(api.post("/auth/logout"), 'Logging out...', 'Logged out successfully', 'Failed to logout');
    window.location.reload();

    if (response.status === 200) {
      dispatch(setUser(null));
    }
  }
}