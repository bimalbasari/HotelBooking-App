import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/properties').then(response => {
      setPlaces(response.data.result);
    });
  }, [])

  return (

    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5" >

      {places.length > 0 && places.map(place => (
        <Link className="bg-blue-100 rounded-2xl" to={`/property/${place._id}`} key={place.title}>
          <div className="rounded-2xl mb-2 bg-gray-500 flex" >
            {place.img?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:5000/' + place.img?.[0]} alt="" />
            )}
          </div>
          {console.log(place._id)}
          <div className="px-2">
            <h2 className=" text-gray-700 font-bold text-2xl"> {place.title}</h2>
            <h3 className="text-green-800 font-semibold ">{place.country},{place?.state},{place?.city}</h3>
          </div>

          <div className="px-2 my-2">
            <span className="font-bold">₹{place.price}</span> per night
          </div>
        </Link>
      ))}

    </div>
  );
}