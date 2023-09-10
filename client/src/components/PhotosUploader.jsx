
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"

export default function PhotosUploader({pictures,setPictures}) {
    const [photoLink, setPhotoLink] = useState([])

    function uploadPhoto(ev) {
        const files = ev.target.files;

        for (let i = 0; i < files.length; i++) {
            setPictures((prevPhotos) => [...prevPhotos, files[i]])

            const reader = new FileReader();
            reader.onloadend = () => {
                // Append the new photo to the existing photos array
                setPhotoLink((prevPhotos) => [...prevPhotos, reader.result]);

            };
            reader.readAsDataURL(files[i]);

        }
    }
    function removePhoto(key) {
        setPictures([...pictures.filter((_, index) => index !== key)]);
        setPhotoLink([...photoLink.filter((_, index) => index !== key)]);
    
    }

    function selectAsMainPhoto(key) {
        setPictures([pictures[key], ...pictures.filter((_, index) => index !== key)]);
        setPhotoLink([photoLink[key], ...photoLink.filter((_, index) => index !== key)]);
    }
    return (
        <>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {photoLink?.map((link, key) => (
                    <div className="h-32 flex relative" key={key}>
                        <img
                            className="rounded-2xl w-full object-cover "
                            src={link}
                            alt="no images"
                        />

                        <button
                            type="button"
                            onClick={() => removePhoto(key)}
                            className="cursor-pointer absolute bottom-1 right-1  bg-white  rounded-2xl py-2 px-3"
                        > <RiDeleteBin5Line className="text-red-500" />
                        </button>

                        <button
                            type="button"
                            onClick={() => selectAsMainPhoto(key)}
                            className="cursor-pointer absolute bottom-1 left-1 bg-black bg-opacity-50 rounded-2xl py-2 px-3"
                        >
                            {key === 0 ? <AiFillStar className="text-yellow-400" /> : <AiOutlineStar className=" text-white" />}
                        </button>
                    </div>
                ))}
                <label className="h-32  cursor-pointer flex items-center gap-1 justify-center border bg-gray-100  text-xl rounded-2xl p-2 text-gray-800">
                    <input
                        type="file"
                        name="pictures"
                        id="pictures"
                        multiple
                        className="hidden"
                        onChange={uploadPhoto}
                    />
                    Upload
                </label>
            </div>
        </>
    );
}
