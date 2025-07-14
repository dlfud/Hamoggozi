import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout/Layout';
import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import PostDetail from "./pages/Post/PostDetail";
import PostInsert from "./pages/Post/PostInsert";
import PostUpdate from "./pages/Post/PostUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />

        <Route path="/main" element={<Layout />}>   
          <Route index element={<Main />} />
        </Route>

        <Route path="/post" element={<Layout />}>   
          <Route path="postDetail/:uid" element={<PostDetail />} />
          <Route path="postInsertPage" element={<PostInsert />} />
          <Route path="postUpdatePage/:uid" element={<PostUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
