"use client";

import { useDispatch } from "react-redux";
import { authenticated } from "../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginType } from "./schema";
import { LoginUser } from "../../services/AuthService";


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



  const handleLogin = async(data:LoginType)=>{

    try{

      const result = await LoginUser(data);


      localStorage.setItem(
        "token",
        result.token
      );


      dispatch(authenticated(true));

      navigate("/");


    }catch(error){

      console.log(error);

    }

  }



  return (

    <div>


      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome Back
      </h1>

      <p className="text-gray-500 mb-8">
        Login to your account
      </p>



      <form 
      onSubmit={handleSubmit(handleLogin)}
      className="space-y-5"
      >


        <div>

        <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded-xl border"
        />


        {
          errors.email &&
          <p className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        }

        </div>




        <div>

        <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl border"
        />


        {
          errors.password &&
          <p className="text-red-500 text-sm">
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
        hover:bg-purple-600/70
        transition
        cursor-pointer
        "
        >
          Sign In
        </button>



      </form>



      <p className="mt-6 text-center text-gray-600">

        Don't have account?


        <button
        onClick={onRegister}
        className="ml-2 text-purple-600 font-semibold hover:underline cursor-pointer"
        >
          Register
        </button>

      </p>


    </div>

  )
}


export default SignIn;