import './App.css';
import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMe } from './redux/operation/authOperaton.js';
import Layout from './component/Layout.jsx';
import {
  HomePage,
  LoginPage,
  SignupPage,
  NotificationsPage,
  OnboardingPage,
  ChatPage,
  CallPage,
  PageNotFound,
  ChangePassword,
  FriendsPage
} from './pages/index.js';

import ProtectedRoute from './ProtectedRoute.jsx';
import AuthProtectedRoute from './AuthProtectedRoute.jsx';


function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    dispatch(getMe(navigate, location));
  }, [dispatch, navigate, location]);

  return (
    <div data-theme={user.theme}>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
        <Route path="/login" element={<AuthProtectedRoute><LoginPage /></AuthProtectedRoute>} />
        <Route path="/signup" element={<AuthProtectedRoute><SignupPage /></AuthProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Layout><NotificationsPage /></Layout></ProtectedRoute>} />
        <Route path="/onboard" element={<OnboardingPage />} />
        <Route path="/chat/:id" element={<ProtectedRoute><Layout showSidebar={false}><ChatPage /></Layout></ProtectedRoute>} />
        <Route path="/call/:callId" element={<ProtectedRoute><Layout><CallPage /></Layout></ProtectedRoute>} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/friends" element={<ProtectedRoute><Layout><FriendsPage /></Layout></ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </div>
  );
}

export default App;
