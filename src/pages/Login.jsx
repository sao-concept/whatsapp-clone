import React from "react";
import { signInWithGoogle } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-[url('assets/bg.webp')]">
      <div className="bg-emerald-500 p-10 rounded-lg shadow-lg text-center ">
        <h1 className="text-2xl font-bold mb-6 text-neutral-200">
          WhatsApp Clone
        </h1>
        <button
          onClick={signInWithGoogle}
          className="flex items-center bg-[#2c3943] text-neutral-200 px-4 py-2 rounded-md hover:bg-[#202d33] "
        >
          <FcGoogle className="mr-2" /> Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
