import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from './screens/ThreadListScreen';  
import ThreadDetailScreen from './screens/ThreadDetailScreen';
import Login from './screens/Login';
import Register from './screens/Register';


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ThreadListScreen />} />
              <Route path="/thread/:threadId" element={<ThreadDetailScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
          </Routes>
      </BrowserRouter>
  );
}

export default App;
