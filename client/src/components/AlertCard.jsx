
import React, { useContext, useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { userContext } from '../App';

function AlertCard() {
    const [open, setOpen] = useState(false);
    const { alert } = useContext(userContext)
    useEffect(() => {
        setOpen(true)
    }, [alert])

    return (
        <>
            {open && alert.message !== "" && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute w-2/5 h-auto p-4 bg-yellow-100 border border-yellow-500 rounded-lg shadow-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />
                            </div>
                            <div className="ml-3 ">
                                <p className="text-sm leading-5 font-medium text-yellow-800">
                                    Alert Message
                                </p>
                                <p className="mt-1 text-sm leading-5 text-yellow-700">
                                    {alert?.message}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 text-sm text-yellow-600 hover:text-yellow-800 focus:outline-none focus:text-yellow-800"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </button>
                            <Link
                                to={`/${alert?.link == "" ? "" : alert.link}`}
                                className="px-4 py-2 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg focus:outline-none focus:bg-yellow-600"
                                onClick={() => setOpen(false)}
                            >
                                {alert?.link == "" ? "Home" : alert.text}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AlertCard;
