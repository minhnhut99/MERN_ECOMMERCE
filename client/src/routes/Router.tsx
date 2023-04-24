import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/login/Login"
import SignUp from "@/pages/signup/SignUp"
import MainNavigation from "@/pages/main_navigation/MainNavigation";
const Router = () => {
  const privateRoutes = () => {
    <Routes></Routes>;
  };
  const publicRoutes = () => (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path='/' element={<MainNavigation />} />
    </Routes>
  );
  return <BrowserRouter>{publicRoutes()}</BrowserRouter>;
};

export default Router; 