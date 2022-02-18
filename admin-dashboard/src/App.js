import theme from "./theme";
import { ThemeProvider } from "@mui/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useReducer } from "react";

import { AuthContext } from "./Context/context";
import { Reducer, AUTH_STATE } from "./Context/reducer";

import LoginDashboard from "./pages/LoginDashboard/login-dashboard";
import UserDashboard from "./pages/Dashboard/user-dashboard";
import DatasetDashboard from "./pages/Dashboard/dataset-dashboard";
import PrivateRoute from "./components/ProtectedRoute/protect-route.component";
import Layout from "./pages/Layout";
import DatasetTablesDashboard from "./pages/DatasetTables/Dataset-Tables-Dashboard";
import AnalyticDashboard from "./pages/DataAnalytic/Analytic-Dashboard";
import CrossValidationDashboard from "./pages/DataAnalytic/Cross-Validation-Dashboard";
import LaptopDashboard from "./pages/Dashboard/laptop-dashboard";

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
              path="dataset/tables"
              element={
                <PrivateRoute>
                  <Layout element={<DatasetTablesDashboard />} />
                </PrivateRoute>
              }
            />
            <Route
              path="user"
              element={
                <PrivateRoute>
                  <Layout element={<UserDashboard />} />
                </PrivateRoute>
              }
            />
            <Route
              path="dataset"
              element={
                <PrivateRoute>
                  <Layout element={<DatasetDashboard />} />
                </PrivateRoute>
              }
            />
            <Route
              path="analytic/result"
              element={
                <PrivateRoute>
                  <Layout element={<AnalyticDashboard />} />
                </PrivateRoute>
              }
            />
            <Route
              path="analytic/cross-validation"
              element={
                <PrivateRoute>
                  <Layout element={<CrossValidationDashboard />} />
                </PrivateRoute>
              }
            />
            <Route
              path="laptop"
              element={
                <PrivateRoute>
                  <Layout element={<LaptopDashboard />} />
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
