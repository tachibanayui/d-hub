import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThreadListScreen from "./screens/ThreadListScreen";
import ThreadDetailScreen from "./screens/ThreadDetailScreen";
import CreateThreadScreen from "./screens/CreateThreadScreen";
import LoginScreen from "./screens/LoginScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import SearchThreads from "./components/SearchThreads";
import CreateTags from "./components/CreateTags";
import CreateReport from "./components/CreateReport";
import EditThreadScreen from "./screens/EditThreadScreen";
import { ToastContainer } from "react-toastify";
import TagList from "./components/TagList";
import TagEdit from "./components/TagEdit";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Report from "./screens/Report";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ThreadListScreen />} />
                <Route path="/thread/:threadId" element={<ThreadDetailScreen />} />
                <Route path="/thread/new" element={<CreateThreadScreen />} />
                <Route path="/thread/:threadId/edit" element={<EditThreadScreen />} />
                <Route path="/search" element={<SearchThreads />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/report" element={<Report />} />
                <Route path="/tag/create" element={<CreateTags />} />
                <Route path="/report/create" element={<CreateReport />} />
                <Route path="/tag" element={<TagList />} />
                <Route path="/tag/edit/:tid" element={<TagEdit />} />

                <Route path="*" element={<NotFoundScreen />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
