import './App.css';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
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
} from './pages/index.js';

import ProtectedRoute from './ProtectedRoute.jsx';
import AuthProtectedRoute from './AuthProtectedRoute.jsx';


function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMe(navigate));
  }, []);

  return (
    <Routes>

      <Route path="/" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
      <Route path="/login" element={<AuthProtectedRoute><LoginPage /></AuthProtectedRoute>} />
      <Route path="/signup" element={<AuthProtectedRoute><SignupPage /></AuthProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Layout><NotificationsPage /></Layout></ProtectedRoute>} />
      <Route path="/onboard" element={<OnboardingPage />} />
      <Route path="/chat" element={<ProtectedRoute><Layout><ChatPage /></Layout></ProtectedRoute>} />
      <Route path="/call" element={<ProtectedRoute><Layout><CallPage /></Layout></ProtectedRoute>} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}

export default App;
