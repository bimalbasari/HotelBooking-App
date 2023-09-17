import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import PlaceGallery from "../components/PlaceGallery";
import { BiSolidLocationPlus } from "react-icons/bi"
import Amenties from "../components/Amenties";

export default function Property() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [place, setPlace] = useState(null);

    const fetchProperty = async (_id) => {
        const proprty = await axios.get(`/properties/${_id}`)
        setPlace(proprty.data)
    }

    useEffect(() => {
        if (!id) {
            navigate("/")
        } else {
            fetchProperty(id)
        }
    }, [id])

    return (
        <>

            {place ?
                <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
                    <h1 className="text-3xl font-bold first-letter:uppercase">{place?.title}</h1>

                    <a className="flex gap-1 my-3 font-semibold underline" target="_blank"
                        href={`http://maps.google.com/?q=${place?.city, place?.state, place?.country}`}>
                        <BiSolidLocationPlus size={28} className="text-blue-600" />
                        {place?.city},{place?.state},{place?.country}
                    </a>

                    <PlaceGallery place={place} />

                    <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                        <div>
                            <div className="my-4">
                                <h2 className=" font-semibold text-2xl ">Description</h2>
                                <hr className="m-2" />
                                {place.description}

                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, commodi vitae asperiores, debitis voluptatibus nisi molestias soluta aperiam, qui dignissimos esse laudantium deserunt totam eum quasi praesentium rerum id voluptatum.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint repudiandae quisquam beatae inventore nemo perspiciatis illo minus nobis! Iste laboriosam ducimus cum alias facilis neque vero maiores voluptas similique nobis.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque nulla, doloremque, fugiat voluptate consequatur modi temporibus aliquid excepturi, rem reprehenderit architecto dicta reiciendis error earum. Recusandae ad quidem impedit ullam
                            </div>
                            <div className="font-semibold text-green-700 border p-3 rounded-lg bg-white">
                                <p> Max number of area: <span className="ml-1 font-bold">{place?.area} </span></p>
                                <p> Max number of bathrooms: <span className="ml-1 font-bold">{place?.bathrooms} </span> </p>
                                <p> Max number of beds: <span className="ml-1 font-bold">{place?.beds} </span></p>
                                <p> Max number of guest: <span className="ml-1 font-bold"> {place?.guest}</span> </p>
                            </div>
                        </div>

                        <div>
                            <BookingForm place={place} />
                        </div>

                    </div>

                    <div className="bg-white -mx-8 px-8 py-8 border-t">
                        <div className="border-b p-4 mb-2">
                            <h2 className=" font-semibold text-2xl ">Extra Info :-</h2>
                        </div>
                        <Amenties property={place} />
                        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
                    </div>

                </div> : <div className="flex justify-center items-center h-screen">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
                    
                </div>
            }
        </>
    );
}