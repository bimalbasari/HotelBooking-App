import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout() {
    return (
        <div className="sm:py-4 sm:px-8 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    );
}