import api from '../../lib/axios';
import { toastHandler } from '../../util/toastHandler';
import { setUser, setIsLoading } from '../slice/userSlice';

export const getMe = (navigate, location) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const response = await toastHandler(
      api.put("/auth/me", { jwt: localStorage.getItem("jwt") }),
      'Loading...',
      'User fetched successfully',
      'Failed to fetch user'
    );

    if (response.status === 200) {
      const userData = response.data.data;
      dispatch(setUser(userData));
      
      // Handle redirect after authentication
      dispatch(setIsLoading(false));
      
      // Get the original path from location state
      const from = location?.state?.from?.pathname;
      
      // If there's a redirect path and user is onboarded, navigate there
      if (from && userData.onBoard !== false) {
        navigate(from, { replace: true });
      } else if (userData.onBoard === false) {
        // If user is not onboarded, go to onboarding page
        navigate('/onboard', { replace: true });
      }
    } else {
      dispatch(setIsLoading(false));
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

export const login = (data, setIsPending, navigate, redirectPath = "/") => {
  return async (dispatch) => {
    setIsPending(true);
    const response = await toastHandler(api.post("/auth/login", data), 'Logging in...', 'Logged in successfully', 'Failed to login');
    setIsPending(false);

    if (response.status === 200) {
      dispatch(setUser(response.data.data));
      
      // Check if the user needs onboarding
      if (response.data.data.onBoard === false) {
        navigate('/onboard');
      } else {
        // Use the redirect path from parameter instead of hardcoding
        navigate(redirectPath, { replace: true });
      }
    }
  }
}

export const logout = () => {
  return async () => {
    const response = await toastHandler(api.post("/auth/logout"), 'Logging out...', 'Logged out successfully', 'Failed to logout');
    window.location.reload();

    if (response.status === 200) {
      dispatch(setUser(null));
      localStorage.removeItem("jwt");
    }
  }
}

export const getUserFriends = async () => {
  try {
    const response = await api.get("/user/friends");
    // console.log("This is the getUserFriends response = ", response);
    return response.data;
  } catch (error) {
    console.error("Failed to load friends", error);
    throw error;
  }
}

export const getRecommendedUsers = async () => {
  try {
    const response = await api.get("/user");
    // console.log("This is the getRecommendedUsers response = ", response);
    return response.data;
  } catch (error) {
    console.error("Failed to load recommended users", error);
    throw error;
  }
}

export const getOutgoingFriendReqs = async () => {
  try {
    const response = await api.get("/user/outgoing-friend-requests");
    // console.log("This is the getOutgoingFriendReqs response = ", response);
    return response.data;
  } catch (error) {
    console.error("Failed to load outgoing friend requests", error);
    throw error;
  }
}

export const sendFriendRequest = async (userId) => {
  const response = await toastHandler(api.post(`/user/friend-request/${userId}`), 'Sending friend request...', 'Friend request sent successfully', 'Failed to send friend request');
  // console.log("This is the sendFriendRequest response = ", response);
  return response.data;
}

export const getFriendRequest = async () => {
  const response = await toastHandler(api.get("/user/friend-requests"), 'Loading friend requests...', 'Friend requests loaded successfully', 'Failed to load friend requests');
  // console.log("This is the getFriendRequest response = ", response);
  return response.data;
}

export const acceptFriendRequest = async (requestId) => {
  const response = await toastHandler(api.post(`/user/friend-request/${requestId}/accept`), 'Accepting friend request...', 'Friend request accepted successfully', 'Failed to accept friend request');
  // console.log("This is the acceptFriendRequest response = ", response);
  return response.data;
}

