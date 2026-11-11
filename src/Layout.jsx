
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router";
import { use, useEffect, useState } from "react";

export default function Layout() {
    const [savedJobs, setSavedJobs] = useState(() => JSON.parse(localStorage.getItem("SavedJobs") ?? "[]"));

    useEffect(() => {
        localStorage.setItem("SavedJobs", JSON.stringify(savedJobs)) 

    }, [savedJobs])

    return (
        <div className="font-sans">
            <Navbar />
            <main className="px-2 max-w-6xl mx-auto ">
                <Outlet context={{ savedJobs, setSavedJobs }} />
            </main>
        </div>
    )
}