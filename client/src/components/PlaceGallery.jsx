import { useEffect, useState } from "react";
import { FcGallery } from "react-icons/fc"

export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(null);

    if (showAllPhotos) {

        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className=" bg-black p-8 grid gap-4  ">
                    <div>
                        <h2 className="text-3xl mr-48" >Photos of {place.title}</h2>
                        <button onClick={() => { setShowAllPhotos(false) }} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {place?.img?.length > 0 && place.img.map(photo => (
                        <div key={photo}>
                            <img src={'http://localhost:5000/' + photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden " >
                <div>
                    {place.img?.[0] && (
                        <div>
                            <img onClick={() => { setShowAllPhotos(true) }} className="aspect-square cursor-pointer object-cover" src={'http://localhost:5000/' + place.img[0]} alt="" />
                        </div>

                    )}
                </div>
                <div className="grid">
                    {place.img?.[1] && (
                        <img onClick={() => { setShowAllPhotos(true) }} className="aspect-square cursor-pointer object-cover" src={'http://localhost:5000/' + place.img[1]} alt="" />
                    )}
                    <div className="overflow-hidden">
                        {place.img?.[2] && (
                            <img onClick={() => { setShowAllPhotos(true) }} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:5000/' + place.img[2]} alt="" />
                        )}
                    </div>

                </div>

            </div>

            <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-2 bg-white rounded-2xl shadow shadow-gray-500 font-semibold ">
               <FcGallery size={25}/>
                Show more photos
            </button>

        </div>
    );
}