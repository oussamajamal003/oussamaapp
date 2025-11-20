import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/login";
import Signup from "../components/signup";
import { useEffect } from "react";

function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login"); 
  }, []);
  
  return ( 
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <Routes>
          <Route path="/login" element= {<Login/>} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </div>
    </div>
  );
}

export default AuthLayout;