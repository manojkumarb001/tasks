import { Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./Components/LoginPage";
import Dashboard from "./Components/DashBoard";


import "./App.css";
import Task from "./Components/Task";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/task" element={<Task />} />

      </Routes>
  );
}

export default App;
