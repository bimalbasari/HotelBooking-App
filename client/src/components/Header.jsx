
import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../App.jsx";
import { BiLogoBitcoin, BiSearchAlt2, BiSolidUserCircle } from "react-icons/bi";
import { GiHamburgerMenu } from 'react-icons/gi';
// import { search } from "../../../server/router/user.routes.js";

const SearchContainer = () => {

    return (
        <div class="bg-gray-100 py-12 absolute left-1/2 transform -translate-x-1/2 ">
            <div class="container mx-auto px-4">
                <div class="bg-white rounded-lg p-8 shadow-lg">
                    <h2 class="text-xl font-semibold mb-6">Find your perfect stay</h2>
                    <form >
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label for="location" class="block text-gray-600">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    placeholder="Anywhere"
                                    class="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label for="check-in" class="block text-gray-600">Check-in</label>
                                <input
                                    type="date"
                                    id="check-in"
                                    class="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label for="check-out" class="block text-gray-600">Check-out</label>
                                <input
                                    type="date"
                                    id="check-out"
                                    class="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <button
                                type="submit"
                                class="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full w-full transition duration-300 ease-in-out"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default function Header() {
    const { user } = useContext(userContext);
    const [dropDown, setDropDown] = useState(false);
    const [dropdownHeight, setDropdownHeight] = useState(0);
    const dropdownRef = useRef(null);
    const [seachBox, setSerachBox] = useState(false)

    useEffect(() => {
        if (dropDown) {
            setDropdownHeight(12);
        } else {
            setDropdownHeight(0);
        }
    }, [dropDown]);


    return (
        <header className="flex justify-between shadow-md p-2 border-t">
            <Link to={'/'} className="flex items-center gap-1">
                <BiLogoBitcoin size={48} />
                <span className="font-bold text-xl hidden sm:block">myhome</span>
            </Link>

            <div className="flex gap-4 border relative border-gray-400 rounded-full py-2.5 px-6 shadow-sm shadow-gray-400">
                <div>Anywhere</div>
                <div className="border-l border-gray-400"></div>
                <div>Any Week</div>
                <div className="border-l border-gray-400"></div>
                <div>Add guest</div>
                <button className="bg-white" onClick={() => setSerachBox(!seachBox)}>
                    <BiSearchAlt2 size={30} className="bg-primary text-white p-1 rounded-full " />
                </button>
            </div>
            {seachBox && <SearchContainer />}



            <div className="relative flex items-center gap-2 border border-gray-400 rounded-full py-2 px-4">
                <GiHamburgerMenu size={20} onClick={() => setDropDown(!dropDown)} />
                <Link to="/account">
                    {user?.picture ? <img src={'http://localhost:5000/' + user?.picture} alt="" className="h-8 w-8 rounded-full content-center" /> : <BiSolidUserCircle size={30} />}
                </Link>
                {dropDown && <div
                    className={`absolute z-10 w-48 bg-black bg-opacity-50 rounded-lg top-16 right-10 border border-gray-400 transition-height duration-500 ease-in-out overflow-hidden`}
                    style={{ height: `${dropdownHeight}rem` }}
                    ref={dropdownRef}
                >
                    <ul className="p-4 space-y-4 font-bold  text-center text-lg text-white" onClick={() => setDropDown(!dropDown)}>
                        {!user &&
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>}
                        {user?.userType == "guest" &&
                            <>
                                <li><Link to="/account">Account</Link></li>
                                <li><Link to="/bookings">Bookings</Link></li>
                            </>}
                        {user?.userType == "host" &&
                            <>
                                <li><Link to="/host/property">Host New Property</Link></li>
                                <li><Link to="">Host Propertes</Link></li>
                            </>}
                        <li><Link to="/help">Help</Link></li>
                        <li><Link to="/about_us">About us</Link></li>
                    </ul>
                </div>}
            </div>
        </header>
    );
}




