import { type LoginType, type RegisterType } from "../components/auth/schema"
export const LoginUser = async(data: LoginType) => {
    const response = await fetch("https://reqres.in/api/login", 
        {
        method: "POST",

        headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        })
    }
    )
    return response.json();
}

export const RegisterUser = async(data: RegisterType) => {
    await fetch("https://reqres.in/api/register",
        {
            method: "POST",
            headers: {
                "x-api-key": import.meta.env.VITE_API_KEY
            },

            body: JSON.stringify({
                email: data.email,
                password: data.password,
            })
        })
}
