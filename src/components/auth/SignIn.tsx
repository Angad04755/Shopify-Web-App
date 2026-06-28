"use client";

import { useDispatch } from "react-redux";
import { authenticated } from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginType } from "./schema";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";


interface Props {
  onRegister: () => void;
}


function SignIn({ onRegister }: Props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm<LoginType>({
    resolver:zodResolver(loginSchema)
  });



  const handleLogin = async ()=>{

      localStorage.setItem(
        "isAuthenticated",
        "authenticated"
      );


      dispatch(authenticated(true));
      toast.success("logged in")

      navigate("/", { replace: true });


  }



  return (

    <div>
      <button className="md:hidden" onClick={() => navigate("/")}><ArrowLeft size={25} color="gray"/></button>

      <h1 className="text-3xl font-semibold text-gray-400 mb-2">
        Welcome Back
      </h1>

      <p className="text-gray-400 mb-8">
        Login to your account
      </p>



      <form 
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-5"
      >


        <div>
        <label className="text-gray-400">Email</label>
        <input
        {...register("email", { setValueAs: (value) => String(value) })}
        type="email"
        className="w-full px-4 py-3 border-b-1 border-gray-400 outline-none focus-within:ring-2 focus-within:ring-purple-500 transition"
        />


        {
          errors.email &&
          <p className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        }

        </div>




        <div>
        <label className="text-gray-400">Password</label>
        <input
        {...register("password", { setValueAs: (value) => String(value) })}
        type="password"
        className="w-full px-4 py-3 border-b-1 border-gray-400 focus-within:ring-2 focus-within:ring-purple-700 transition outline-none"
        />


        {
          errors.password &&
          <p className="text-red-400 text-sm">
            {errors.password.message}
          </p>
        }


        </div>




        <button
        className="
        w-full 
        bg-purple-600 
        text-white 
        py-3 
        rounded-xl
        hover:bg-purple-700
        active:bg-purple-800
        transition
        cursor-pointer
        "
        >
          Sign In
        </button>



      </form>



      <p className="mt-6 text-center text-gray-400">

        Don't have account?


        <button
        onClick={onRegister}
        className="ml-2 text-purple-700 font-semibold hover:underline cursor-pointer"
        >
          Register
        </button>

      </p>


    </div>

  )
}


export default SignIn;