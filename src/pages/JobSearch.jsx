import { useEffect, useState } from "react";
import { jobSearchAPI } from "../api/api";
import { JobList } from "../components/JobList";
import styles from "./JobSearch.module.css"

export function JobSearch() {
    const [query, setQuery] = useState("")
    const [jobList, setJobList] = useState([])

    function handleSubmit(event) {
        event.preventDefault()
        const input = document.getElementById("jobSearch")
        setQuery(input.value)
    }

    useEffect(() => {
        let ignore = false

        async function getJobs(query) {
            const data = await jobSearchAPI(query)
            if (!ignore) {
                setJobList(data.hits)
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
                <label htmlFor="jobSearch">Search for jobs: </label>
                <div>
                    <input id="jobSearch" type="text"></input>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <JobList jobList={jobList} />

        </div>
    )
}