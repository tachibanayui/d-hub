import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from './screens/ThreadListScreen';
import ThreadDetailScreen from './screens/ThreadDetailScreen';
import CreateThreadScreen from './screens/CreateThreadScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
// import CreateTags from './components/CreateTags';
import Report from './screens/Report';
import Login from './screens/Login';
import Register from './screens/Register';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ThreadListScreen />} />
                <Route path="/thread/:threadId" element={<ThreadDetailScreen />} />
                <Route path="/thread/new" element={<CreateThreadScreen />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path='/tags/create' element={<Create />} /> */}
                {/* <Route path='/taglist' element={<TagList />} /> */}
                <Route path="*" element={<NotFoundScreen />} />
                <Route path="/report" element={<Report />} />
                <Route path="/register" element={<Register />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
