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

    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()
        const input = document.getElementById("jobSearch")
        setQuery(input.value)
        setHasSearched(true)
    }

    useEffect(() => {
        let ignore = false

        async function getJobs(query, selectedRegionID, offset, setHasMore) {
            try {
                const data = await jobSearchAPI(query, selectedRegionID, offset, setHasMore)

                if (!ignore) {
                    setJobList((prev) => [...prev, ...data.hits])
                }
            } catch {
                setError(true)
                console.error("error fetching from jobSearchAPI", error)
            }
        }
        if (query !== "") {
            getJobs(query, selectedRegionID, offset, setHasMore)
        }
        return () => ignore = true
    }, [query, selectedRegionID, offset, setHasMore])

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
            {hasMore && <button className={styles.loadMore} onClick={() => setOffset((prev) => prev + 20)}>Load More</button>}
        </div>
    )
}
