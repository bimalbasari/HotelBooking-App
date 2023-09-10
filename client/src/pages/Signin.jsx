import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form"


export default function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [picture, setPicture] = useState("");
    const [previewURL, setPreviewURL] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("")
    const [showPwd, setShowPwd] = useState(false)

    const handlePic = (e) => {
        let selectedPicture = e.target.files[0];
        setPicture(selectedPicture);
        if (selectedPicture) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewURL(reader.result);
            };
            reader.readAsDataURL(selectedPicture);
        }
    };


    async function onSubmit(data) {
        try {
            if (watch("password") === confirmPwd) {
                const register = await axios.post('/auth/register', {
                    data,
                    picture
                }, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                // alert('Registration suceessful. Now you can login')
                console.log(register)
            }
        } catch (error) {
            // alert('Resistration falied. please try again later');
        }


    }


    return (
        <div className="sm:mt-4 grow flex items-center justify-around">
            <div className=" md:w-4/5 w-full ">

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-8 gap-2 w-full  border-2 p-8 rounded-md" >
                    <h1 className="text-4xl col-span-8 font-semibold text-green-500 text-center mb-4 border-b-2 pb-2">REGISTER</h1>
                    <div className="w-full col-span-8 text-center">

                        <div className="mb-4 flex items-center justify-center">
                            <label className="sm:h-48 sm:w-48 w-32 h-32 cursor-pointerflex items-center justify-center rounded-full object-cover overflow-hidden">
                                <input type="file" className="hidden" name="picture" onChange={handlePic} required />
                                <img src={picture ? previewURL : "/user_dummy.png"} alt="user"  className='w-full h-full' />
                            </label>
                        </div>
                        <label className="mb-4">Profile picture</label>

                    </div>

                    <div className="col-span-8">
                        <label htmFor="userType">User type</label>
                        <select name="userType" className="w-full" id="userType" {...register("userType")} required>
                            <option value="guest">Guest</option>
                            <option value="host">Host</option>
                        </select>
                    </div>

                    <div className="w-full sm:col-span-4 col-span-8">
                        <label htmFor="firstName">First name</label>
                        <input type="text" className="form-control" name="firstName" id="firstName" {...register("firstName")} required placeholder="First name" />
                    </div>

                    <div className="w-full sm:col-span-4 col-span-8">
                        <label htmFor="lastName">Last name</label>
                        <input type="text" className="form-control" name="lastName" required placeholder="Last name" {...register("lastName")} />
                    </div>
                    <div className="w-full md:col-span-2 col-span-8">
                        <label htmFor="gender">Gender</label><br />
                        <select name="gender" className="w-full"  {...register("gender")}>
                            <option value="Male" > Male</option>
                            <option value="Female" > Female</option>
                            <option value="Other" > Other</option>
                        </select>
                    </div>
                    <div className="w-full md:col-span-2 col-span-8">
                        <label htmFor="dob">Date of Birth</label><br />
                        <input type="date" className="form-control" name="dob"  {...register("dob")} id="dob" />
                    </div>
                    <div className="w-full md:col-span-4 col-span-8">
                        <label htmFor="contactNumber">Contact</label><br />
                        <input type="number" className="form-control" name="phone" id="phone" {...register("phone")} required />
                    </div>

                    <div className="w-full md:col-span-4 col-span-8">
                        <label htmFor="city">City</label>
                        <input type="text" className="form-control" name="city" id="city"  {...register("city")} required placeholder="City" />
                    </div>

                    <div className="w-full md:col-span-4 col-span-8">
                        <label htmFor="country">Country</label>
                        <input type="text" className="form-control" name="country" id="country" {...register("country")} required placeholder="Country" />
                    </div>

                    <div className="w-full md:col-span-8 col-span-8">
                        <label htmFor="email">Email</label>
                        <input type="email" className="form-control" name="email" id="email" {...register("email")} required placeholder="name@example.com" />
                    </div>


                    <div className="w-full md:col-span-4 col-span-8">
                        <label className="">Password </label>
                        <div className="relative">
                            <input type={showPwd ? 'text' : 'password'} id="password" className="w-full"{...register("password")} />
                            <button type="button" className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none" onClick={() => setShowPwd(!showPwd)}>
                                {showPwd ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:col-span-4 col-span-8">
                        <label htmFor="comparepswd">Confirm Password</label>
                        <input type={showPwd ? 'text' : 'password'} className="form-control" name="comparepswd" id="comparepswd" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} required placeholder="Confirm password" />
                    </div>

                    <div className="col-span-8 text-center">
                        <button type="submit" className="bg-blue-500 sm:w-1/4 w-3/4 p-2 rounded-md font-semibold text-white">Sign up</button>
                    </div>

                </form>
                <div className="text-center font-semibold py-2 text-gray-600 bg-gray-300 m-2 rounded-md" >Already a member? <Link className="underline text-black" to={'/login'}>Login</Link> </div>
            </div>


        </div>
    );
}