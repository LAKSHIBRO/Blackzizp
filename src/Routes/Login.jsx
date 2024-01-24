import React, { useState } from "react";
import {
  Person,
  Lock,
  VisibilityOff,
  Visibility,
} from "@mui/icons-material";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../Assets/images/logo.png";
import AnimateImage from "../components/animateImage";
import { env_data } from "../config/config";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ip, setIp] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigateToDashboard = () => {
    navigate("/Dashboard");
  };
  const navigatetoSignUP = () => {
    navigate("/SignUp");
  };
  const Auth = async (e) => {
    e.preventDefault();
    try {
      //   setWait(true);
      const res = await axios.post(`${env_data.base_url}/login`, {
        email: email,
        password: password,
        ipv4: ip,
      });
      //   setJoke(true);
      setMsg(res.data.msg);
      setTimeout(async () => {
        const response = await axios.get(`${env_data.base_url}/token`);
        const decoded = jwt_decode(res.data.accessToken);
        if (decoded.email === "admin@admin.com") {
          navigate("/AdminDash");
        } else {
          navigate("/Dashboard");
        }
      }, 2000);
    } catch (error) {
      if (error.response) {
        // setWait(false);
        // setJoke(true);
        setMsg(error.response.data.msg);
        setTimeout(() => {
          //   setJoke(false);
        }, 2000);
      }
    }
  };
  return (
    <div className="w-full h-screen overflow-hidden fixed dlex justify-center items-center bg-gradient-to-br from-[#2d2d2d] via-[#151517] to-[#131314]">
      <div className="flex w-full justify-between items-center h-full relative">
        <div className="form-container md:w-[90%] lg:h-auto w-[90%] sm:w-[80%] mx-auto flex lg:flex-row flex-col rounded-[6px] z-10 relative justify-center items-center">
          <div className="lg:w-1/3 h-full flex flex-col p-8 rounded-br-[6px] rounded-tr-[6px] w-full">
            <div className="relative ">
              <img src={logo} alt="" className="object-contain w-full" />
            </div>
            <h2 className="text-white text-[1.2rem] font-semibold">
              Sign in to Your Account
            </h2>
            <h3 className="text-white text-[12px]">
              Singin to create, discover and connect with global community{" "}
            </h3>

            <div className="flex flex-col mt-5 w-full space-y-5">
              <span className="text-white text-[14px] uppercase">username</span>
              <div className="w-full rounded-[6px] h-[44px] bg-[#151515] border-[1px] border-[#FFA524] flex flex-row justify-center items-center">
                <div className="bg-[#FFA524] h-[44px] w-[44px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                  <span className="text-[16px] text-[#151515]">
                    <Person />
                  </span>
                </div>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="w-[85%] h-full p-2 bg-transparent outline-none text-white"
                />
                <div className=" h-[44px] w-[44px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex"></div>
              </div>
            </div>

            <div className="flex flex-col mt-5 w-full space-y-5">
              <span className="text-white text-[14px] uppercase">Password</span>
              <div className="w-full rounded-[6px] h-[44px] bg-[#151515] border-[1px] border-[#FFA524] flex flex-row justify-between items-center">
                <div className="bg-[#FFA524] h-[44px] w-[44px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                  <span className="text-[16px] text-[#151515]">
                    <Lock />
                  </span>
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[80%] h-full p-2 bg-transparent outline-none text-white"
                />
                <div className=" h-[44px] w-[44px] rounded-bl-[6px] rounded-tl-[6px] justify-center items-center flex">
                  {passwordVisible ? (
                    <span
                      className="text-[16px] text-[#FFA524] cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <Visibility />
                    </span>
                  ) : (
                    <span
                      className="text-[16px] text-[#FFA524] cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <VisibilityOff />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={Auth}
              className="w-full rounded-[6px] uppercase text-[#151515] font-semibold h-[44px] bg-gradient-to-r from-[#FFA524] to-[#FFDC4A] flex flex-row justify-center items-center mt-5"
            >
              Login
            </button>

            <div className="flex flex-col mt-5">
              <Link to="/ForgotPassword">
                <span className="text-[14px]  text-[#FFA524]">
                  Forgot Password?
                </span>
              </Link>
              <span className="text-[14px]  text-white">
                Don’t have an account?{" "}
                <span
                  className="text-[14px]  text-[#FFA524] cursor-pointer"
                  onClick={navigatetoSignUP}
                >
                  Register Here{" "}
                </span>
              </span>
            </div>
          </div>

          <div className="lg:w-2/3 h-screen rounded-bl-[6px] rounded-tl-[6px] hidden lg:flex flex-col  justify-center items-center"></div>
        </div>

        <div className="lg:w-3/4 h-screen rounded-bl-[6px] rounded-tl-[6px] hidden lg:flex flex-col  justify-center items-center absolute right-0">
          <AnimateImage />
        </div>
      </div>
    </div>
  );
};

export default Login;
