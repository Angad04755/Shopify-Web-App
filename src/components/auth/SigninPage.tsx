"use client";

import { useDispatch } from "react-redux";
import { authenticated } from "../../store/features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "./schema";
import { type LoginType } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUser } from "../../services/AuthService";

function SigninPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignIn = async (
    data: LoginType
  ) => {
    try {
      const result = await LoginUser(data);

      console.log(result);

      localStorage.setItem(
        "token",
        result.token
      );

      dispatch(authenticated(true));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <span className="text-2xl">👋</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Email Address
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition duration-300 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;