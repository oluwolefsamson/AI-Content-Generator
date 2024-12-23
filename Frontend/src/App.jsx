import React from "react";
import { Navbar, Footer } from "./components";
import styles from "./style";
import AppRouter from "./router/router";
import { useLocation, Navigate } from "react-router-dom";

// Dummy authentication check function
const useAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const App = () => {
  const location = useLocation();
  const isAuthenticated = useAuth();

  // Define paths where Navbar and Footer should be hidden
  const hiddenPaths = ["/", "/login", "/register", "*"];
  // Define paths where Navbar and Footer should always be shown
  const alwaysShowPaths = ["/404"];

  const isHiddenPage = hiddenPaths.includes(location.pathname);
  const isAlwaysShowPage = alwaysShowPaths.includes(location.pathname);

  // Redirect to login if accessing a protected route without authentication
  if (!isAuthenticated && !isHiddenPage) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-black w-full overflow-hidden">
      {!isHiddenPage || isAlwaysShowPage ? (
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      ) : null}
      <div className={`bg-black ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <AppRouter />
        </div>
      </div>
      {!isHiddenPage || isAlwaysShowPage ? (
        <div className={`bg-black ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
