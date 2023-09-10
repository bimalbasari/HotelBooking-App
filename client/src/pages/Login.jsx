import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
// import { UserContext } from "../UserContext";

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showPwd, setShowPwd] = useState(false);
    const [user, setUser] = useState("")
    // const { setUser } = useContext(UserContext);

    async function onSubmit(data) {
        try {
            const user = await axios.post('/auth/login', data, { headers: { 'Content-Type': 'application/json' } });

            if (user?.data) {
                setUser(user?.data);
                <Navigate to={'/'} />
            }
        } catch (err) { alert('login failed') }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around ">
            <div className="flex h-3/4 w-4/5 rounded-lg overflow-hidden">
                <div className="relative sm:block hidden">
                    <img src="/login.jpeg" className="h-full w-auto" alt="loginimage" />
                    <div className="flex items-center justify-center text-2xl  absolute  bottom-28 w-full h-24 bg-white bg-opacity-70">
                        <NewUser />
                    </div>
                </div>
                <div className="sm:w-3/5 w-full h-full p-6 bg-red-500">
                    <h1 className="text-4xl text-center mb-4 text-white font-serif font-semibold">Login</h1>
                    <form className="h-96 mx-auto" onSubmit={handleSubmit(onSubmit)} >
                        <div className="w-full ">
                            <label htmlFor="email"> Enter your email</label>
                            <input type="email" name="email" id="email" {...register("email")} required placeholder="example@gmail.com" />
                        </div>
                        <div className="w-full">
                            <label htmlFor="password">Password </label>
                            <div className="relative">
                                <input type={showPwd ? 'text' : 'password'} id="password" name="password" className="w-full"{...register("password")} />
                                <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none" onClick={() => setShowPwd(!showPwd)}>
                                    {showPwd ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <button className="primary font-semibold mt-4 text-xl">Login</button>
                        <div className="sm:hidden w-full text-xl text-white">
                            <NewUser />
                        </div>
                    </form>

                </div>

            </div>
        </div>
    );
}

const NewUser = () => { return (<div>Don't have account yet? <Link className="underline text-blue-500" to={'/register'}>Register now</Link> </div>) }