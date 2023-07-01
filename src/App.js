import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from './screens/ThreadListScreen';  
import ThreadDetailScreen from './screens/ThreadDetailScreen';
import CreateTags from './components/CreateTags';


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<ThreadListScreen />} />
              <Route path="/" element={<CreateTags />} />
              
          </Routes>
      </BrowserRouter>
  );
}

export default App;
