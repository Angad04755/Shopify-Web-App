import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Register } from "../../store/features/auth/registerSlice";

import { useNavigate, Link } from "react-router-dom";

import { type RootState } from "../../store/store";

import { registerSchema } from "./schema";

import { type RegisterType } from "./schema";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterUser } from "../../services/AuthService";

import { toast } from "react-toastify";

function SignupPage() {
  const isRegistered = useSelector(
    (state: RootState) =>
      state.register.isRegistered
  );

  const [error, setError] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(
      registerSchema
    ),
  });

  const handleRegister = async (
    data: RegisterType
  ) => {
    try {
      setLoading(true);

      setError(false);

        await RegisterUser(data);

      dispatch(Register(true));

      toast.success(
        "Account created"
      );

      navigate("/sign-in");
    } catch (error) {
      setError(true);

      toast.error(
        "Error creating account"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/sign-in");
    }
  }, [isRegistered]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Sign up to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            handleRegister
          )}
          className="space-y-5"
        >
          {/* EMAIL */}
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
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>

            <input
              {...register(
                "password"
              )}
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-2">
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              Error creating
              account
            </p>
          )}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white py-3 rounded-xl font-semibold transition duration-300 active:scale-[0.98]"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-purple-600 font-semibold hover:text-purple-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;