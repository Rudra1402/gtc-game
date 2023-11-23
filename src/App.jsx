import classNames from 'classnames';
import { useContext, useEffect } from 'react';
import {
  Route, Routes, BrowserRouter as Router
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomCard from './components/custom/CustomCard';
import Toast from './components/custom/CustomToast';
import Homepage from './components/homepage/homepage'
import Leaderboard from './components/leaderboard/Leaderboard';
import Guest from './components/modes/guest';
import User from './components/modes/user';
import Navbar from './components/navbar/Navbar'
import Login from './components/userModules/Login';
import Register from './components/userModules/Register';
import Verify from './components/userModules/Verify';
import AppContext from './context/AppContext';

function App() {
  const { user, isDark } = useContext(AppContext);
  return (
    <CustomCard className={classNames(
      'flex flex-col h-screen w-screen overflow-y-auto',
      isDark ? 'bg-[#0a2846] text-gray-100' : 'bg-gray-100 !text-gray-800'
    )}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/leaderboard" Component={Leaderboard} />
          <Route exact path="/mode/guest" Component={Guest} />
          <Route exact path="/mode/user" Component={User} />
          <Route path="/verify/:token" Component={Verify} />
        </Routes>
      </Router>
      <ToastContainer />
    </CustomCard>
  )
}

export default App
