import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface RefreshHandlerProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const RefreshHandler = ({ setIsAuthenticated }: RefreshHandlerProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register" ||
        pathname === "/forgot-password"
      ) {
        navigate("/", { replace: false });
      }
    }
  }, [pathname, setIsAuthenticated, navigate]);
  return null;
};

export default RefreshHandler;
