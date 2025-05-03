
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/operation/authOperaton.js'
function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => 
  {
      dispatch(getMe(navigate));
  }, []);
  return (
    <div className="" data-theme="dark">
      <Outlet />
    </div>
  )
}

export default App
