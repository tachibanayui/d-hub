import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from './screens/ThreadListScreen';  
import ThreadDetailScreen from './screens/ThreadDetailScreen';


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ThreadListScreen />} />
              <Route path="/thread/:threadId" element={<ThreadDetailScreen />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
