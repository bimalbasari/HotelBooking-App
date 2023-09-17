import { Navigate, useParams } from "react-router-dom";
import { Country, State, City } from 'country-state-city';
import PhotosUploader from "../components/PhotosUploader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
// import { set } from "mongoose";


export default function HostProperty() {
    const { register, handleSubmit, setValue, formState: { erors }, watch } = useForm()
    const { id } = useParams();
    const country = Country.getAllCountries()
    const countryIso = watch('country')?.slice(0, 2).toUpperCase()
    const states = State?.getStatesOfCountry(countryIso);
    const stateData = watch("state")
    const stateIso = stateData?.slice(0, 2)
    const state = stateData?.slice(2)
    const city = City.getCitiesOfState(countryIso, stateIso)
    const [redirect, setRedirect] = useState(false);
    const [pictures, setPictures] = useState([])

    const onSubmit = async (data) => {

        // const formData = new FormData();
        // console.log(data)
        // Append text input fields to formData
        // for (const key in data) {
        //     formData.append(key, data[key]);
        // }

        // // Append pictures to formData
        // pictures.forEach((picture, index) => {
        //     formData.append(`pictures`, picture);
        // });

        // Now you can submit the formData to your server using axios or any other method.
        try {
            // const data = await axios.post("/host/property", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            // });


            // if (data) {

            // } else {
            //     // Handle error.
            // }
        } catch (error) {
            console.log(error)
            // Handle the error.
        }
    };


    const preInput = (header, description) => {
        return (
            <>
                <h2 className="text-2xl mt-4">{header}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </>
        );
    }

    // async function savePlace(ev) {
    //     ev.preventDefault();
    //     const placeData = {
    //         title, address, addedPhotos,
    //         description, perks, extraInfo,
    //         checkIn, checkOut, maxGuests, price,
    //     };

    //     if (id) {
    //         //update
    //         await axios.put('/places', {
    //             id, ...placeData

    //         });
    //         setRedirect(true);

    //     } else {
    //         //new places
    //         await axios.post('/places', placeData);
    //         setRedirect(true);
    //     }

    // }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div className="col-span-2 p-2 ">
            {/* <AccountNav /> */}
            <form onSubmit={handleSubmit(onSubmit)}>

                {preInput('Title', 'Title for your place should be short and catcy in the advertisment')}
                <input type="text" name="title" {...register("title")} placeholder="title , for example: My lovley Apartment" />
                <div className="grid gap-2 grid-cols-6">

                    <div className="col-span-2 ">
                        {preInput("Country")}
                        <select name="country"  {...register("country")}>
                            <option value="">Choose...</option>
                            {country.map(e => <option key={e.name} value={e.name}>{e.name}</option>)}
                        </select>
                    </div>

                    <div className="col-span-2">
                        {preInput("State")}
                        <select name="state" {...register("state")}>
                            <option value="">Choose...</option>
                            {states?.map((e) => (
                                <option key={e.name} value={`${e.isoCode},${e.name}`}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2">
                        {preInput("City")}
                        <select name="city" {...register("city")}>
                            <option value="">Choose...</option>
                            {city?.map((e) => (
                                <option key={e.name} value={e.name}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-3">
                        {preInput("Landmark", "abc, near xyz, with pincode")}
                        <input type="text" name="landmark" {...register("landmark")} />
                    </div>
                    <div className="col-span-3">
                        {preInput("Area", "like 9999 SF")}
                        <input type="number" name="area" {...register("area")} />
                    </div>
                </div>



                {preInput('Photos', ' main pic select using star,max-6')}

                <PhotosUploader pictures={pictures} setPictures={setPictures} />


                {preInput('Description', 'description of the place')}
                <textarea id="" cols="20" rows="5" name="description" {...register("description")} />

                {preInput('Perks', 'Select  the perks')}

                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                    <div className="flex gap-2 col-span-2">
                        Amenties
                        <input
                            type="checkbox"
                            {...register("amenties")}
                            name="amenties"
                            value="true"
                        />

                    </div>
                    <div className="flex gap-2 col-span-2">
                        Garden view
                        <input

                            type="checkbox"
                            {...register("gardenview")}
                            name="gardenview"
                            value="true"
                        />
                    </div>

                    <div className="flex gap-2 col-span-2">
                        Beache Access
                        <input
                            type="checkbox"
                            {...register("beachaccess")}
                            name="beachaccess"
                            value="true"
                        />

                    </div>
                    <div className="flex gap-2 col-span-2">
                        Wifi
                        <input
                            type="checkbox"
                            {...register("wifi")}
                            name="wifi"
                            value="true"
                        />

                    </div>
                    <div className="flex gap-2 col-span-2">
                        Parking
                        <input
                            type="checkbox"
                            {...register("parking")}
                            name="parking"
                            value="true"
                        />

                    </div>
                    <div className="flex gap-2 col-span-2">
                        Pool
                        <input

                            type="checkbox"
                            {...register("pool")}
                            name="pool"
                            value="true"
                        />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        Mountain view
                        <input

                            type="checkbox"
                            {...register("mountainview")}
                            name="mountainview"
                            value="true"
                        />

                    </div>


                    <div className="flex gap-2 col-span-2">
                        Kitchen
                        <input

                            type="checkbox"
                            {...register("kitchen")}
                            name="kitchen"
                            value="true"
                        />

                    </div>
                    <div className="flex gap-2 col-span-2">
                        Television
                        <input type="checkbox" name="tv" value="true" {...register("tv")} />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        Air conditioning
                        <input type="checkbox" name="aircondition" value="true" {...register("aircondition")} />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        Pets allowed
                        <input
                            type="checkbox"
                            {...register("pets")}
                            name="pets"
                            value="true"
                        />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        Dedicated workspace
                        <input


                            type="checkbox"
                            {...register("workspace")}
                            name="workspace"
                            value="true"
                        />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        Alarm
                        <input
                            type="checkbox"
                            {...register("alarm")}
                            name="alarm"
                            value="true"
                        />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        Private entrance
                        <input
                            type="checkbox"
                            {...register("privateEntrance")}
                            name="privateEntrance"
                            value="true"
                        />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        Park
                        <input
                            type="checkbox"
                            {...register("park")}
                            name="Park"
                            value="true"
                        />
                    </div>
                    <div className="flex gap-2 col-span-2">
                        child Park
                        <input
                            type="checkbox"
                            {...register("childPark")}
                            name="childPark"
                            value="true"
                        />
                    </div>

                </div>

                {preInput('Room & rents', 'add beds bathrooms guests and rent, remember to have some window for cleaning the room between guest')}

                <div className="grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">

                    <div className=" col-span-2">
                        <h3 className="mt-2 -mb-1">No. of Beds</h3>
                        <input type="number" placeholder="14" name="beds" {...register("beds")} />
                    </div>

                    <div className="col-span-2">
                        <h3 className="mt-2 -mb-1">No. of Bathrooms</h3>
                        <input type="number" placeholder="11" name="bathrooms" {...register("bathrooms")} />
                    </div>

                    <div className="col-span-2">
                        <h3 className="mt-2 -mb-1">Max number of guest</h3>
                        <input type="number" name="guest" {...register("guest")} />
                    </div>

                    <div className="col-span-2">
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input type="number" name="price" {...register("price")} />
                    </div>
                    {/* <input type="" name="" {...register("")} /> */}
                </div>

                {preInput('Extra info', 'house rules, etc {optional}')}
                <textarea name="exterinfo" {...register("exterinfo")} />

                <button type="submit" className="primary my-4">Save</button>
                <button type="reset" className="primary my-4">Reset</button>


            </form>
        </div>
    )
}