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
import Avatar1 from "./assets/img/avatar1.png";
import Avatar2 from "./assets/img/avatar2.png";
import Avatar3 from "./assets/img/avatar3.png";
import Avatar4 from "./assets/img/avatar4.png";
import ConsultResultPage from "./pages/ConsultPage/ConsultResultPage/ConsultResultPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./components/ProtectedRoute/protect-route.component";

const App = (props) => {
  const [user, dispatch] = useReducer(Reducer, AUTH_STATE);
  const pictureList = [Avatar1, Avatar2, Avatar3, Avatar4];
  let random = Math.floor(Math.random() * 4);
  const profilePic = pictureList[random];
  console.log(profilePic);
  console.log("app:", user);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={<Layout element={<LandingPage />} avatar={profilePic} />}
            />
            <Route path="/login" element={<Layout element={<LoginPage />} />} />
            <Route
              path="/register"
              element={
                <Layout element={<RegisterPage />} avatar={profilePic} />
              }
            />
            <Route
              path="/contact"
              element={<Layout element={<ContactPage />} avatar={profilePic} />}
            />
            <Route
              path="/consult"
              element={
                <Layout
                  avatar={profilePic}
                  element={
                    <PrivateRoute>
                      <ConsultPage />
                    </PrivateRoute>
                  }
                />
              }
            />
            <Route
              path="/consult/results"
              element={
                <Layout element={<ConsultResultPage />} avatar={profilePic} />
              }
            />
            <Route
              path="/survey"
              element={
                <Layout
                  avatar={profilePic}
                  element={
                    <PrivateRoute>
                      <SurveyPage />
                    </PrivateRoute>
                  }
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Layout
                  avatar={profilePic}
                  element={
                    <PrivateRoute>
                      <ProfilePage avatar={profilePic} />
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
