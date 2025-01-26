import  { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import TasksPage from "./pages/TasksPage";
import Layout from "./components/Layout";
import RefreshHandler from "./components/RefreshHandler";
import FeedPage from "./pages/FeedPage";
import OtpVerification from "./components/Otp";
import ChangePassword from "./components/ChangePassword";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/change-password" element={<ChangePassword />} />


        <Route path="/" element={<PrivateRoute element={<Layout />}/>}>
            <Route index element={<Navigate to="/tasks" replace />} />
            <Route  element={<Navigate to="/feed" replace />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="feed" element={<FeedPage/>} />
          </Route>
      </Routes>
    </div>
  );
};

export default App;
