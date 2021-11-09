import theme from "./theme";
import { ThemeProvider } from "@mui/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useReducer } from "react";

import { AuthContext } from "./Context/context";
import { Reducer, AUTH_STATE } from "./Context/reducer";

import LoginDashboard from "./pages/LoginDashboard/login-dashboard";
import UserDashboard from "./pages/Dashboard/user-dashboard.jsx";
import SpesifikasiDashboard from "./pages/Dashboard/spesifikasi-dashboard";
import LaptopDashboard from "./pages/Dashboard/laptop-dashboard";
import AnalyticDashboard from "./pages/Dashboard/analytic-dashboard";
import LaptopTypeDashboard from "./pages/Dashboard/laptop-type";
import PrivateRoute from "./components/ProtectedRoute/protect-route";
import LaptopTypeFormData from "./components/FormDataComponent/form-laptop-type.component";

function App(props) {
  const [user, dispatch] = useReducer(Reducer, AUTH_STATE);
  console.log("app:", props);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ user, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="login" element={<LoginDashboard />} />
            <Route
              path="dashboard/user/*"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard/laptop-type/*"
              element={
                <PrivateRoute>
                  <LaptopTypeDashboard />
                </PrivateRoute>
              }
            >
              <Route path="add" element={<LaptopTypeFormData />} />
              <Route path=":id" element={<LaptopTypeFormData />} />
            </Route>
            <Route path="form" element={<LaptopTypeFormData />} />
            <Route
              path="dashboard/laptop/*"
              element={
                <PrivateRoute>
                  <LaptopDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard/spesifikasi/*"
              element={
                <PrivateRoute>
                  <SpesifikasiDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard/analytic/*"
              element={
                <PrivateRoute>
                  <AnalyticDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
