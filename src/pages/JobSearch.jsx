import { useEffect, useState } from "react";
import { jobSearchAPI } from "../api/api";
import { LocationDropdown } from "../components/LocationDropdown.jsx";
import { JobList } from "../components/joblist.jsx";
import styles from "./JobSearch.module.css";


export function JobSearch() {
    const [query, setQuery] = useState("")
    const [jobList, setJobList] = useState([])
    const [error, setError] = useState(false)
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedRegionID, setSelectedRegionID] = useState("");

    function handleSubmit(event) {
        event.preventDefault()
        const input = document.getElementById("jobSearch")
        setQuery(input.value)
        setHasSearched(true)
    }

    useEffect(() => {
        let ignore = false

        async function getJobs(query, selectedRegionID) {
            try {
                const data = await jobSearchAPI(query, selectedRegionID)
                if (!ignore) {
                    setJobList(data.hits)
                }
            } catch {
                setError(true)
                console.error("error fetching from jobSearchAPI", error)
            }
        }
        if (query !== "") {
            getJobs(query, selectedRegionID)
        }
        return () => ignore = true
    }, [query, selectedRegionID])

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="jobSearch">Search for jobs here: </label>
                <div>
                    <input id="jobSearch" type="text"></input>
                    <button type="submit">Submit</button>
                </div>
                <div id="Location">
                    <LocationDropdown setSelectedRegionID={setSelectedRegionID} />
                </div>
            </form>
            <p>{error && "Error"}</p>
            {hasSearched && <JobList jobList={jobList} />}
        </div>
    )
}
