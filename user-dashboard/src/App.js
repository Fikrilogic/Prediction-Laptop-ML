import "./App.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Context/context";
import { Reducer, AUTH_STATE } from "./Context/reducer";
import { useReducer } from "react";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import ConsultPage from "./pages/ConsultPage/ConsultPage";
import SurveyPage from "./pages/SurveyPage/SurveyPage";
import PostSurveyPage from "./pages/SurveyPage/PostSurveyPage/PostSurveyPage";
import ConsultResultPage from "./pages/ConsultPage/ConsultResultPage/ConsultResultPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./components/ProtectedRoute/protect-route.component";

const App = (props) => {
  const [user, dispatch] = useReducer(Reducer, AUTH_STATE);
  console.log("app:", props);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={<Layout element={<LandingPage />} />}
            />
            <Route path="/login" element={<Layout element={<LoginPage />} />} />
            <Route
              path="/register"
              element={<Layout element={<RegisterPage />} />}
            />
            <Route
              path="/contact"
              element={<Layout element={<ContactPage />} />}
            />
            <Route
              path="/consult"
              element={<Layout element={<ConsultPage />} />}
            />
            <Route
              path="/consult/results"
              element={<Layout element={<ConsultResultPage />} />}
            />
            <Route
              path="/survey"
              element={
                <Layout
                  element={
                    <PrivateRoute>
                      <SurveyPage />
                    </PrivateRoute>
                  }
                />
              }
            />
            <Route
              path="/survey/success"
              element={
                <Layout
                  element={
                    <PrivateRoute>
                      <PostSurveyPage />
                    </PrivateRoute>
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Layout
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
