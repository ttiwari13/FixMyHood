// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import Report from "./components/Report";
import CommunityFeed from "./components/CommunityFeed";
import MyProfile from "./components/MyProfile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />   
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
