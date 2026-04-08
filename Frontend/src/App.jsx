import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/login";
import Signup from "./Components/signup";
import HomePage from "./Components/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
              <HomePage />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;