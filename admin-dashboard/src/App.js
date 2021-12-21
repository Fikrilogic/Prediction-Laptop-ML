import theme from "./theme";
import {ThemeProvider} from "@mui/styles";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {useReducer} from "react";

import {AuthContext} from "./Context/context";
import {Reducer, AUTH_STATE} from "./Context/reducer";

import LoginDashboard from "./pages/LoginDashboard/login-dashboard";
import UserDashboard from "./pages/Dashboard/user-dashboard.jsx"
import DatasetDashboard from './pages/Dashboard/dataset-dashboard.jsx'
import PrivateRoute from "./components/ProtectedRoute/protect-route";

function App(props) {
    const [user, dispatch] = useReducer(Reducer, AUTH_STATE);
    console.log("app:", props);

    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{user, dispatch}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                        <Route path="login" element={<LoginDashboard/>}/>
                        <Route
                            path="dashboard/user/*"
                            element={
                                <PrivateRoute>
                                    <UserDashboard/>
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='dashboard/dataset/*'
                            element={
                                <PrivateRoute>
                                    <DatasetDashboard></DatasetDashboard>
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
