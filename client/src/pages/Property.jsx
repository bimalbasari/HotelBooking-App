import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import { BiSolidLocationPlus } from "react-icons/bi"
import Amenties from "../components/Amenties";

export default function Property() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const fetchProperty = async (_id) => {
        const proprty = await axios.get(`/properties/${_id}`)
        console.log(_id, proprty)

        setPlace(proprty.data)
    }

    useEffect(() => {
        if (!id) {
            <Navigate to="/" />
        } else {
            fetchProperty(id)
        }
    }, [id])

    if (!place) return '';

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>

            {/* <AddressLink>{place.country}{place?.state}</AddressLink> */}
            <a className="flex gap-1 my-3 font-semibold underline" target="_blank"
                href={'http://maps.google.com/?q='}>
                <BiSolidLocationPlus size={28} className="text-blue-600" />

            </a>

            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className=" font-semibold text-2xl ">Description</h2>
                        {place.description}
                    </div>

                    Max number of guest: {place.guest}

                </div>

                <div>
                    <BookingWidget place={place} />
                </div>

            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className=" font-semibold text-2xl ">Extra info</h2>
                </div>
                <Amenties property={place}/>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>

        </div>
    );
}