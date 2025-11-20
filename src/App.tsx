import { useState, useEffect } from "react";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { toast } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time and check authentication
    const initializeApp = async () => {
      // Wait for minimum splash screen time (e.g., 1.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user is already logged in
      const token = localStorage.getItem("auth_token");
      if (token) {
        setIsLoggedIn(true);
      }
      
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  // Show splash screen while loading
  if (isLoading) {
    return <SplashScreen />;
  }

  if (isLoggedIn) {
    return (
      <div>
        <MainLayout
          onLogout={() => {
            localStorage.removeItem("auth_token");
            setIsLoggedIn(false);
            console.log("logged out, token:", localStorage.getItem("auth_token"));
            toast.info("You have been logged out.");
          }}
        /> 
      </div>
    );
  } else {
    return (
      <div>
        <AuthProvider onLogin={(token) => {
            setIsLoggedIn(true);
            console.log("logged in, token:", token);
          }}>
          <AuthLayout />
        </AuthProvider>
      </div>
    );
  }
}

export default App;