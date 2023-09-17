import { useForm } from "react-hook-form";
import axios from "axios";
// import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

export default function BookingWidget({ place }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { user, alert, setUser, setAlert } = useContext(userContext)
    const navigate = useNavigate()
    const checkIns = watch("checkIn")
    const checkOut = watch("checkOut")
    const [price, setPrice] = useState()

    function getToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function getMaxDate() {
        const today = new Date();
        today.setFullYear(today.getFullYear() + 1);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    async function onSubmit(data) {
        if (!user) {
            setAlert({
                ...alert,
                message: "For booking you need to login first",
                link: "login",
                text: "Login"
            })
        } else {
            try {
                const response = await axios.post(`/user/booking/${place._id}`, data, { headers: { 'Content-Type': 'application/json' } });
                if (response?.data) { navigate(`/booking/${response?.data}`) }

            } catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        let days = checkOut?.slice(checkOut.length - 2) - checkIns?.slice(checkIns.length - 2)
        if (days == 0) {
            days = 1
        }
        setPrice(days * place?.price)
    }, [checkIns, checkOut])



    return (
        <form className="bg-white shadow p-4 rounded-2xl" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-2xl text-center ">
                Price: ₹{place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4" >
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>
                        <input type="date" id="checkIn" min={getToday()} max={getMaxDate()}{...register("checkIn", { required: true })} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date" id="checkOut" min={checkIns} max={getMaxDate()} {...register("checkOut", { required: true })} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input type="number" id="guests"{...register("guests", { required: true })} />
                </div>

                <div className="py-3 px-4 border-t">
                    <label>Your full name:</label>
                    <small className="block text-red-400">As on your id card .</small>
                    <input type="text" id="name"{...register("name", { required: true })} />

                    <label>Phone number:</label>
                    <input type="number" id="phone"{...register("phone", { required: true })} />
                </div>


            </div>

            <button type="submit" className="primary mt-4">
                Book this place
                {checkIns && checkOut && (
                    <span> ₹{price}</span>
                )}
            </button>

        </form>
    );
}
