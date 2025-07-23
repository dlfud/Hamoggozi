import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout/Layout';
import Login from "./pages/Login";
import Join from "./pages/Join";
import GroupProviderWrapper from './pages/Layout/GroupProviderWrapper';
import GroupList from "./pages/GroupList";
import CreateGroup from "./pages/CreateGroup";
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

        <Route element={<GroupProviderWrapper />}>
          <Route path="/groupList" element={< GroupList/>} />
          <Route path="/createGroup" element={< CreateGroup />} />

          <Route path="/main/:groupUid" element={<Layout />}>   
            <Route index element={<Main />} />
          </Route>

          <Route path="/post" element={<Layout />}>   
            <Route path="postDetail/:uid" element={<PostDetail />} />
            <Route path="postInsertPage" element={<PostInsert />} />
            <Route path="postUpdatePage/:uid" element={<PostUpdate />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
