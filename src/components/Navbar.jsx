import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./Navbar.module.css"

export function Navbar() {

    return (
        <nav className={styles.navbar}>
            <Link to="/">Search Jobs</Link>
        </nav>
    )



}