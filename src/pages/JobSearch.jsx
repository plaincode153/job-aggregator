import { useEffect, useState } from "react";
import { jobSearchAPI } from "../api/api";
import { LocationDropdown } from "../components/LocationDropdown.jsx";
import { ProfessionDropdown } from "../components/ProfessionDropdown.jsx";
import { FiltersDropdown } from "../components/FiltersDropdown.jsx";
import { JobList } from "../components/JobList.jsx";
import styles from "./JobSearch.module.css";

export function JobSearch() {
    const [query, setQuery] = useState("")
    const [jobList, setJobList] = useState([])
    const [error, setError] = useState(false)
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedRegionID, setSelectedRegionID] = useState();
    const [selectedMunicipalityIDs, setSelectedMunicipalityIDs] = useState([]);
    const [activeGroupIDs, setActiveGroupIDs] = useState([]);
    const [activeFieldID, setActiveFieldID] = useState();
    const [searchVersion, setSearchVersion] = useState(0);

    const [offset, setOffset] = useState(0)
    const [hasMore, setHasMore] = useState(false);

    function handleSubmit(event) {
        event.preventDefault()
        const input = document.getElementById("jobSearch")

            setJobList([])
            setQuery(input.value)
            setOffset(0)
            setSearchVersion((prev) => prev + 1)
            setHasSearched(true)
        
        }

    useEffect(() => {
        let ignore = false

        async function getJobs(query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, activeGroupIDs, activeFieldID) {
            try {
                const data = await jobSearchAPI(query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, activeGroupIDs, activeFieldID)

                if (!ignore) {
                    setJobList((prev) => [...prev, ...data.hits])
                }
            } catch {
                setError(true)
                console.error("error fetching from jobSearchAPI", error)
            }
        }
        if (query !== "") {
            getJobs(query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, activeGroupIDs, activeFieldID)
        }
        return () => ignore = true
    }, [query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, searchVersion, activeGroupIDs, activeFieldID])

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="jobSearch">Search for jobs here: </label>
                <div>
                    <input id="jobSearch" type="text"></input>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className={styles.dropdowns}>
                <div className={styles.locationDropdown}>
                    <LocationDropdown selectedRegionID={selectedRegionID} selectedMunicipalityIDs={selectedMunicipalityIDs} setSelectedMunicipalityIDs={setSelectedMunicipalityIDs} setSelectedRegionID={setSelectedRegionID} setOffset={setOffset} setJobList={setJobList} setSearchVersion={setSearchVersion} />
                </div>
                <div className={styles.professionDropdown}>
                    <ProfessionDropdown
                        setOffset={setOffset}
                        setJobList={setJobList}
                        setSearchVersion={setSearchVersion}
                        activeGroupIDs={activeGroupIDs}
                        setActiveGroupIDs={setActiveGroupIDs}
                        activeFieldID={activeFieldID}
                        setActiveFieldID={setActiveFieldID} />
                </div>
                <div className={styles.filtersDropdown}>
                    <FiltersDropdown />
                </div>
            </div>
            <p>{error && "Error"}</p>
            {hasSearched && <JobList jobList={jobList} />}
            {hasMore && <button className={styles.loadMore} onClick={() => setOffset((prev) => prev + 20)}>Load More</button>}
        </div>
    )
}
