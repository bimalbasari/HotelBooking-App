import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import AlertCard from "./components/AlertCard";

export default function Layout() {
    return (
        
        <div className="sm:py-4 sm:px-8 flex flex-col min-h-screen">
            <Header />
            <div className="relative flex items-center justify-center">
                <AlertCard/>
            </div>
            <Outlet />
        </div>
    );
}