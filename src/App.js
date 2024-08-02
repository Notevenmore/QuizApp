import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/home";
import Category from "./pages/category";
import Quiz from "./pages/quiz";
import Evaluation from "./pages/evaluation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/category/:category/dificulty/:dificulty" element={<Quiz />} />
        <Route path="/category/:category/dificulty/:dificulty/evaluation" element={<Evaluation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
