import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      const response = await axios.post("http://localhost:8080/auth/login", credentials);

      if (response.status === 200) {
        const data = response.data;
        console.log("Server response:", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", JSON.stringify(data.role));

        const isAdmin = data.role.some((role) => role.name === "ADMIN");
        const isChef = data.role.some((role) => role.name === "CHEF");
        const isEmployee = data.role.some((role) => role.name === "EMPLOYEE");

        if (isAdmin) {
          navigate("/admin/restaurants/");
        } else if (isChef) {
          navigate("/chef/");
        } else if (isEmployee) {
          navigate("/employee/");
        } else {
          console.error("No valid role found!");
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data.message);
      } else {
        console.error("Something went wrong:", error.message);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=')" }}>

      {/* Overlay to make background image subtle */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      {/* Form content with dark theme and grid layout */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-4 lg:mx-auto bg-black bg-opacity-50">
        
        {/* Left Side Content */}
        <div className="flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
          <p className="text-gray-300 mb-4">Please log in to continue.</p>
          <img 
            src={assets.background} 
            alt="Assorted fast food items" 
            className="" 
            style={{ maxWidth: "100%", height: "auto" }} 
          />
        </div>

        {/* Right Side Form */}
        <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email:</label>
              <input className="w-full px-3 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                id="email"
                type="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password:</label>
              <input
                className="w-full px-3 py-2  text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <a href="#" className="text-sm text-gray-400 hover:text-gray-200 float-right mt-1">Forgot Password?</a>
            
            
            
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300">Sign in</button>
            </div>
            <div className="mt-6 text-center">
              <span className="text-gray-400">Don't have an account yet? </span>
              <a href="#" className="text-white hover:underline">Register for free</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;