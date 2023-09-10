import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../files/UserContext";
import { BiLogoBitcoin, BiSearchAlt2, BiSolidUserCircle } from "react-icons/bi"
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Header() {

    const { user } = useContext(UserContext);

    return (
        <header className='flex justify-between shadow-md p-2 border-t'>


            <Link to={'/'} className="flex items-center gap-1">

                <BiLogoBitcoin size={48} />
                <span className='font-bold text-xl'>myhome</span>
            </Link>



            <div className='flex gap-4 border border-gray-400 rounded-full py-2.5 px-6 shadow-sm shadow-gray-400'>

                <div>Anywhere</div>
                <div className="border-l border-gray-400"></div>

                <div>Any Week</div>
                <div className="border-l border-gray-400"></div>

                <div>Add guest</div>

                <button className="bg-white" >
                    <BiSearchAlt2 size={30} className='bg-primary text-white p-1 rounded-full ' />
                </button>

            </div>



            <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-400 rounded-full py-2 px-4'>
                <GiHamburgerMenu size={20} />
                {/* className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden' */}
                <div >
                    <BiSolidUserCircle size={30} />
                </div>
                {!!user && (
                    <div>
                        {user.name}
                    </div>
                )}

            </Link>

        </header>
    );

}