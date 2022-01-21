import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  function checkAuth() {
    const check = localStorage.getItem("auth");
    if (!check) return false;
    const status = JSON.parse(check);
    if (status.isAuthenticated === true) return true;
    if (status.isAuthenticated !== true) return false;
  }
  const auth = checkAuth();
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
