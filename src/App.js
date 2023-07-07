import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from './screens/ThreadListScreen';  
import ThreadDetailScreen from './screens/ThreadDetailScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import { ToastContainer } from 'react-toastify';
import Profile from './screens/Profile';
import Admin from './screens/Admin';


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ThreadListScreen />} />
              <Route path="/thread/:threadId" element={<ThreadDetailScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              
          </Routes>
         
      </BrowserRouter>
  );
}

export default App;
