

import React, { useState } from 'react';
import { FaCarRear, FaHouseLaptop, FaKitchenSet,FaChildCombatant, FaMountainSun, FaPaw, FaSnowflake, FaUmbrellaBeach, FaWaterLadder } from "react-icons/fa6"
import { BsTreeFill, BsWifi, BsTv, BsBell,BsDoorOpenFill } from 'react-icons/bs';

function PropertyFeature({ property, icon, text }) {    
    return (
        <div className={`flex items-center gap-2 w-fit  text-xl text-gray-800 col-span-1 ${property ? "" :'line-through'}`}>
            <span>{icon}</span>
            <span>{text}</span>

        </div>
    );
}

function Amenties({ property }) {
    return (
        <div className='grid grid-cols-6 gap-2'>
            <PropertyFeature property={property?.beachAccess} icon={<FaUmbrellaBeach />} text="Beach access - Beachfront" />
            <PropertyFeature property={property?.gardenview} icon={<BsTreeFill />} text="Garden view" />
            <PropertyFeature property={property?.childPark} icon={<FaChildCombatant/>} text="Child park" />
            <PropertyFeature property={property?.wifi} icon={<BsWifi />} text="Wi-fi" />
            <PropertyFeature property={property?.parking} icon={<FaCarRear />} text="Free parking on premises" />
            <PropertyFeature property={property?.pool} icon={<FaWaterLadder />} text="Swimming pool" />
            <PropertyFeature property={property?.mountainview} icon={<FaMountainSun />} text="Mountain view" />
            <PropertyFeature property={property?.kitchen} icon={<FaKitchenSet />} text="Kitchen" />
            <PropertyFeature property={property?.tv} icon={<BsTv />} text="HDTV with standard cable/satellite TV" />
            <PropertyFeature property={property?.petsAllowed} icon={<FaPaw />} text="Pets Allowed" />
            <PropertyFeature property={property?.aircondition} icon={<FaSnowflake />} text="AC - split-type ductless system" />
            <PropertyFeature property={property?.workspace} icon={<FaHouseLaptop />} text="Dedicated workspace" />
            <PropertyFeature property={property?.alarm} icon={<BsBell />} text="Alarm" />
            <PropertyFeature property={property?.privateEntrance} icon={<BsDoorOpenFill/>} text="Private Entrance" />
        </div>
    );
}

export default Amenties;
