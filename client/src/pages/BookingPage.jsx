import AccountNav from "../components/AccountNav";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BookingDate, { getDays } from "../components/BookingDate";

import { BiSolidLocationPlus } from "react-icons/bi";
import PlaceGallery from "../components/PlaceGallery";
import { userContext } from "../App";
import { FaExclamationTriangle } from "react-icons/fa";
export default function BookingPage() {
    const { id } = useParams();
    const { alert, setAlert } = useContext(userContext)
    const [booking, setBooking] = useState();
    const [cancel, setCancel] = useState(false)
    const [response, setResponce] = useState("")

    const findBooking = async () => {
        try {
            const response = await axios.get(`/user/booking/${id}`)
            if (response) {
                setBooking(response.data);
                setResponce(`Are you want cancel booking ${response.data?.place.title}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const cancelBooking = async () => {
        setCancel(false)
        try {
            const response = await axios.delete(`/user/booking/cancel/${id}`)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        findBooking()
    }, [id]);


    return (
        <>
            {booking && <div className="my-8 border-2 p-2 rounded-xl shadow-md">
                {
                    cancel && <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute w-2/5 h-auto p-4 bg-pink-300 border border-yellow-500 rounded-lg shadow-md text-white">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <FaExclamationTriangle className="h-5 w-5 text-red-800" />
                                </div>
                                <div className="ml-3 ">
                                    <p className="text-xl leading-5 font-medium ">
                                        Alert!
                                    </p>
                                    <p className="mt-1 text-lg leading-5 ">
                                        {response}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 text-sm text-yellow-600 hover:text-yellow-800 focus:outline-none focus:text-yellow-800"
                                    onClick={() => setCancel(false)}
                                >
                                    No
                                </button>
                                <button
                                    className="px-4 py-2 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg focus:outline-none focus:bg-yellow-600"
                                    onClick={cancelBooking}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                }

                <h1 className="text-3xl">{booking?.place.title}</h1>
                <a className="flex gap-1 my-3 font-semibold underline" target="_blank"
                    href={`http://maps.google.com/?q=${booking?.place?.city, booking?.place?.state, booking?.place?.country}`}>
                    <BiSolidLocationPlus size={28} className="text-blue-600" />
                    {booking?.place?.city},{booking?.place?.state},{booking?.place?.country}
                </a>
                <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl mb-4">Your booking information</h2>
                        {<BookingDate checkOut={booking.checkOut} checkIn={booking.checkIn} />}

                    </div>
                    <div className="bg-primary p-6 text-white rounded-2xl">
                        <div> Total price</div>
                        <div className="text-3xl">₹{booking?.place.price * getDays(booking.checkOut, booking.checkIn)}</div>
                    </div>
                </div>
                <PlaceGallery place={booking?.place} />
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-center mt-4">
                    <button
                        onClick={() => setCancel(true)}
                        className="bg-red-400 hover:bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    >
                        Cancel Booking
                    </button>
                    <Link
                        to="/"
                        className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    >
                        Book a New One
                    </Link>
                    <Link
                        to="/bookings"
                        className="bg-green-400 hover:bg-green-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    >
                        Back to Bookings
                    </Link>
                </div>



            </div>}
        </>
    )
}




