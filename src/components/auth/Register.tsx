"use client";


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver }
    from "@hookform/resolvers/zod";


import {
    RegisterSchema,
    type RegisterType
} from "../schema/RegisterSchema";
import { toast } from "sonner";


interface Props {
    onLogin: () => void;
}



function Register({ onLogin }: Props) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterType>({
        resolver: zodResolver(RegisterSchema)
    });





    const handleRegister = (data: RegisterType) => {
        setLoading(true);
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
        toast.success("Account Registered");
        onLogin();
        setLoading(false);
    }




    return (

        <div>
            <button className="md:hidden" onClick={() => navigate("/")}><ArrowLeft size={25} color="gray"/></button>

            <h1 className="text-3xl font-semibold text-gray-400 mb-2">
                Create Account
            </h1>


            <p className="text-gray-400 mb-8">
                Register yourself
            </p>



            <form
                onSubmit={handleSubmit((data) => {
                    handleRegister(data);
                })}
                className="space-y-5"
            >


                <label className="text-gray-400">Email</label>
                <input

                    {...register("email", { setValueAs: (data) => String(data) })}

                    type="email"

                    className="w-full px-4 py-3 border-b-1 border-gray-400 focus-within:ring-2 focus-within:ring-purple-700 outline-none transition"

                />


                {errors.email && (
                    <p className="text-red-400 text-sm">
                        {errors.email.message}
                    </p>
                )}




                <label className="text-gray-400">Password</label>
                <input

                    {...register("password", { setValueAs: (data) => String(data) })}

                    type="password"

                    className="w-full px-4 py-3 border-b-1 border-gray-400 focus-within:ring-2 focus-within:ring-purple-700 outline-none transition"

                />



                {errors.password && (
                    <p className="text-red-400 text-sm">
                        {errors.password.message}
                    </p>
                )}

                <label className="text-gray-400">Confirm Password</label>
                <input

                    {...register("confirm_password", { setValueAs: (data) => String(data) })}

                    type="password"

                    className="w-full px-4 py-3 border-b-1 border-gray-400 focus-within:ring-2 focus-within:ring-purple-700 outline-none transition"

                />



                {errors.confirm_password && (
                    <span className="text-red-400 text-sm">{errors.confirm_password.message}</span>
                )}




                <button

                    disabled={loading}

                    className="
w-full
bg-purple-600
text-white
py-3
rounded-xl
disabled:opacity-50
hover:bg-purple-700
active:bg-purple-800
transition
cursor-pointer
"

                >

                    {
                        loading ?
                            "Creating..." :
                            "Create Account"
                    }


                </button>



            </form>



            <p className="mt-6 text-center text-gray-400">


                Already have account?


                <button
                    onClick={onLogin}
                    className="ml-2 text-purple-700 font-semibold hover:underline cursor-pointer"
                >

                    Sign In

                </button>



            </p>



        </div>


    )


}


export default Register;