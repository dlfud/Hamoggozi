import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Join from "./pages/Join";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
