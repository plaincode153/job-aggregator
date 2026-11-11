import { useState, useEffect } from "react";
import { Link } from "react-router";

export function Navbar() {

    return (
        <nav className="bg-blue-500 border-b-5 border-gray-700 py-6 font-bold text-4xl text-yellow-300">
            <div className="max-w-6xl mx-auto px-2">
                <Link to="/">Search Jobs</Link>
                <span className="pl-5">
                    <Link to="/saved-jobs">Saved Jobs</Link>
                </span>
            </div>
        </nav>
    )



}