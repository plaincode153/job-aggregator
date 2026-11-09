
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router";

export default function Layout() {
    return (
        <div className="font-sans">
            <Navbar />
            <main className="px-2 max-w-6xl mx-auto ">
                <Outlet />
            </main>
        </div>
    )
}