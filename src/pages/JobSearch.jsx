import { useEffect, useState, useRef } from "react";
import { jobSearchAPI } from "../api/api";
import { LocationDropdown } from "../components/LocationDropdown.jsx";
import { ProfessionDropdown } from "../components/ProfessionDropdown.jsx";
import { FiltersDropdown } from "../components/FiltersDropdown.jsx";
import { JobList } from "../components/JobList.jsx";

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
    
    const jobSearchInputRef = useRef(null)

    function handleSubmit(event) {
        event.preventDefault()
        const input = jobSearchInputRef.current.value

            setJobList([])
            setQuery(input)
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
            <form className="mt-2" onSubmit={handleSubmit}>
                <label className=" block mb-0.5" htmlFor="jobSearch">Search for jobs here: </label>
                <div>
                    <input ref={jobSearchInputRef} className="border-black border rounded-md py-0.5 pl-1 bg-gray-50 focus-visible:outline-yellow-400" id="jobSearch" type="text"></input>
                    <button className="border px-2 rounded-md ml-2 py-0.5 bg-gray-50 focus-visible:outline-yellow-400 cursor-pointer" type="submit">Submit</button>
                </div>
            </form>
            <div className="flex gap-2 my-2 ">
                <div>
                    <LocationDropdown selectedRegionID={selectedRegionID} selectedMunicipalityIDs={selectedMunicipalityIDs} setSelectedMunicipalityIDs={setSelectedMunicipalityIDs} setSelectedRegionID={setSelectedRegionID} setOffset={setOffset} setJobList={setJobList} />
                </div>
                <div>
                    <ProfessionDropdown
                        setOffset={setOffset}
                        setJobList={setJobList}
                        activeGroupIDs={activeGroupIDs}
                        setActiveGroupIDs={setActiveGroupIDs}
                        activeFieldID={activeFieldID}
                        setActiveFieldID={setActiveFieldID} />
                </div>
                <div>
                    <FiltersDropdown />
                </div>
            </div>
            <p>{error && "Error"}</p>
            {hasSearched && <JobList jobList={jobList} />}
            {hasMore && <button className="focus-visible:outline-yellow-400 cursor-pointer" onClick={() => setOffset((prev) => prev + 20)}>Load More</button>}
        </div>
    )
}
