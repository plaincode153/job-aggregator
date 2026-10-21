import { useEffect, useState } from "react";
import { jobSearchAPI } from "../api/api";
import { JobList } from "../components/JobList";
import styles from "./JobSearch.module.css"

export function JobSearch() {
    const [query, setQuery] = useState("")
    const [jobList, setJobList] = useState([])
    const [error, setError] = useState(false)
    const [hasSearched, setHasSearched] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()
        const input = document.getElementById("jobSearch")
        setQuery(input.value)
        setHasSearched(true)
    }

    useEffect(() => {
        let ignore = false

        async function getJobs(query) {
            try {
                const data = await jobSearchAPI(query)
                if (!ignore) {
                    setJobList(data.hits)
                }
            } catch {
                setError(true)
                console.error("error fetching from jobSearchAPI", error)
            }
        }
        if (query !== "") {
            getJobs(query)
        }
        return () => ignore = true
    }, [query])

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="jobSearch">Search for jobs here: </label>
                <div>
                    <input id="jobSearch" type="text"></input>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <p>{error && "Error"}</p>
            {hasSearched && <JobList jobList={jobList} />}
        </div>
    )
}