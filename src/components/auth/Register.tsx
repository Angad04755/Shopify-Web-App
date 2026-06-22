"use client";


import { useState } from "react";

import { useDispatch } from "react-redux";

import { Register as RegisterAction }
    from "../../store/features/auth/registerSlice";


import { useForm } from "react-hook-form";

import { zodResolver }
    from "@hookform/resolvers/zod";


import {
    registerSchema,
    type RegisterType
} from "./schema";


import { RegisterUser }
    from "../../services/AuthService";


interface Props {
    onLogin: () => void;
}



function Register({ onLogin }: Props) {


    const dispatch = useDispatch();


    const [loading, setLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema)
    });





    const handleRegister = async (data: RegisterType) => {


        try {

            setLoading(true);


            await RegisterUser(data);


            dispatch(RegisterAction(true));


            onLogin();



        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }


    }




    return (

        <div>


            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
            </h1>


            <p className="text-gray-500 mb-8">
                Register yourself
            </p>



            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-5"
            >



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




                <button

                    disabled={loading}

                    className="
w-full
bg-purple-600
text-white
py-3
rounded-xl
disabled:opacity-50
hover:bg-purple-600/70
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



            <p className="mt-6 text-center text-gray-600">


                Already have account?


                <button
                    onClick={onLogin}
                    className="ml-2 text-purple-600 font-semibold hover:underline cursor-pointer"
                >

                    Sign In

                </button>



            </p>



        </div>


    )


}


export default Register;