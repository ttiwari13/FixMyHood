// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import Home from "./components/Home"; // Import Home page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> {/* Add the Home route */}
      </Routes>
    </Router>
  );
}

export default App;
