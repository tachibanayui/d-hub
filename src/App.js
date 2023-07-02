import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from "./screens/ThreadListScreen";
import ThreadDetailScreen from "./screens/ThreadDetailScreen";
import CreateThreadScreen from "./screens/CreateThreadScreen";
import LoginScreen from "./screens/LoginScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import SearchThreads from "./components/SearchThreads";
import CreateTag from "./components/CreateTags";
import TagList from "./components/TagList";

function App() {
      return (
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<ThreadListScreen />} />
                  <Route path="/thread/:threadId" element={<ThreadDetailScreen />} />
                  <Route path="/thread/new" element={<CreateThreadScreen />} />
                <Route path="/search" element={<SearchThreads />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path='/tags/create' element={<CreateTag />} />
                <Route path='/taglist' element={<TagList />} />
                <Route path="*" element={<NotFoundScreen  />} />
                  
            </Routes>
          </BrowserRouter>
      );
}

export default App;
