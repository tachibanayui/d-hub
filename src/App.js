import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from './screens/ThreadListScreen';
import ThreadDetailScreen from './screens/ThreadDetailScreen';
import CreateThreadScreen from './screens/CreateThreadScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import CreateTags from './components/CreateTags';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ThreadListScreen />} />
                <Route path="/thread/:threadId" element={<ThreadDetailScreen />} />
                <Route path="/thread/new" element={<CreateThreadScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path='/tags/create' element={<Create />} />
                <Route path='/taglist' element={<TagList />} />
                <Route path="*" element={<NotFoundScreen />} />
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
