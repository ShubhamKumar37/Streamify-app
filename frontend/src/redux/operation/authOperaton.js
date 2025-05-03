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

export const getUserFriends = async () => {
  const response = await toastHandler(api.get("/user/friends"), 'Loading friends...', 'Friends loaded successfully', 'Failed to load friends');
  console.log("This is the getUserFriends response = ", response);
  return response.data;
}

export const getRecommendedUsers = async () => {
  const response = await toastHandler(api.get("/user"), 'Loading recommended users...', 'Recommended users loaded successfully', 'Failed to load recommended users');
  console.log("This is the getRecommendedUsers response = ", response);
  return response.data;
}

export const getOutgoingFriendReqs = async () => {
  const response = await toastHandler(api.get("/user/outgoing-friend-requests"), 'Loading outgoing friend requests...', 'Outgoing friend requests loaded successfully', 'Failed to load outgoing friend requests');
  console.log("This is the getOutgoingFriendReqs response = ", response);
  return response.data;
}

export const sendFriendRequest = async (userId) => {
  const response = await toastHandler(api.post(`/user/friend-request/${userId}`), 'Sending friend request...', 'Friend request sent successfully', 'Failed to send friend request');
  console.log("This is the sendFriendRequest response = ", response);
  return response.data;
}

export const acceptFriendRequest = async (requestId) => {
  const response = await toastHandler(api.post(`/user/friend-request/${requestId}/accept`), 'Accepting friend request...', 'Friend request accepted successfully', 'Failed to accept friend request');
  console.log("This is the acceptFriendRequest response = ", response);
  return response.data;
}

export const getStreamToken = async () => {
  const response = await toastHandler(api.get("/chat/token"), 'Loading stream token...', 'Stream token loaded successfully', 'Failed to load stream token');
  console.log("This is the getStreamToken response = ", response);
  return response.data;
}