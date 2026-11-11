import { useEffect, useState, useRef } from "react";
import { jobSearchAPI } from "../api/api";
import { LocationDropdown } from "../components/LocationDropdown.jsx";
import { ProfessionDropdown } from "../components/ProfessionDropdown.jsx";
import { FiltersDropdown } from "../components/FiltersDropdown.jsx";
import { JobList } from "../components/JobList.jsx";
import { useOutletContext } from "react-router";

export function JobSearch() {
    const { savedJobs, setSavedJobs } = useOutletContext();

    const [query, setQuery] = useState(
        () => localStorage.getItem("query") ?? "")
    const [jobList, setJobList] = useState([])
    const [error, setError] = useState(false)
    const [hasSearched, setHasSearched] = useState(
        () => localStorage.getItem("hasSearched") === "true");
    const [selectedRegionID, setSelectedRegionID] = useState(
        () => localStorage.getItem("selectedRegionID") ?? "");
    const [selectedMunicipalityIDs, setSelectedMunicipalityIDs] = useState(
        () => JSON.parse(localStorage.getItem("selectedMunicipalityIDs") ?? "[]"));
    const [activeGroupIDs, setActiveGroupIDs] = useState(
        () => JSON.parse(localStorage.getItem("activeGroupIDs") ?? "[]"));
    const [activeFieldID, setActiveFieldID] = useState(
        () => localStorage.getItem("activeFieldID") ?? "");
    const [searchVersion, setSearchVersion] = useState(0);

    const [abroad, setAbroad] = useState(
        () => localStorage.getItem("abroad") === "true");

    const [remote, setRemote] = useState(
        () => localStorage.getItem("remote") ?? "");

    const [hireWorkplace, setHireWorkplace] = useState(
        () => localStorage.getItem("hireWorkplace") ?? "");

    const [experience, setExperience] = useState(
        () => localStorage.getItem("experience") ?? "");

    const [unspecifiedSwedenWorkplace, setUnspecifiedSwedenWorkplace] = useState(
        () => localStorage.getItem("unspecifiedSwedenWorkplace") === "true");

    const [drivingLicenseRequired, setDrivingLicenseRequired] = useState(
        () => localStorage.getItem("drivingLicenseRequired") ?? "");

    const [larling, setLarling] = useState(
        () => localStorage.getItem("larling") ?? "");

    const [trainee, setTrainee] = useState(
        () => localStorage.getItem("trainee") ?? "");

    const [franchise, setFranchise] = useState(
        () => localStorage.getItem("franchise") ?? "");

    const [openForAll, setOpenForAll] = useState(
        () => localStorage.getItem("openForAll") ?? "");

    const [sort, setSort] = useState(
        () => localStorage.getItem("sort") ?? "");

    useEffect(() => {
        localStorage.setItem("query", query)
        localStorage.setItem("hasSearched", hasSearched)
        localStorage.setItem("selectedRegionID", selectedRegionID ?? "")
        localStorage.setItem("selectedMunicipalityIDs", JSON.stringify(selectedMunicipalityIDs))
        localStorage.setItem("activeGroupIDs", JSON.stringify(activeGroupIDs))
        localStorage.setItem("activeFieldID", activeFieldID ?? "")
        localStorage.setItem("abroad", abroad)
        localStorage.setItem("remote", remote)
        localStorage.setItem("hireWorkplace", hireWorkplace)
        localStorage.setItem("experience", experience)
        localStorage.setItem("unspecifiedSwedenWorkplace", unspecifiedSwedenWorkplace)
        localStorage.setItem("drivingLicenseRequired", drivingLicenseRequired)
        localStorage.setItem("larling", larling)
        localStorage.setItem("trainee", trainee)
        localStorage.setItem("franchise", franchise)
        localStorage.setItem("openForAll", openForAll)
        localStorage.setItem("sort", sort)
    }, [query, hasSearched, selectedRegionID, selectedMunicipalityIDs, activeGroupIDs, activeFieldID, abroad, remote, hireWorkplace, experience, unspecifiedSwedenWorkplace, drivingLicenseRequired, larling, trainee, franchise, openForAll, sort])

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

        async function getJobs(query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, activeGroupIDs, activeFieldID, abroad, remote, hireWorkplace, experience, unspecifiedSwedenWorkplace, drivingLicenseRequired, larling, trainee, franchise, openForAll, sort) {
            try {
                const data = await jobSearchAPI(query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, activeGroupIDs, activeFieldID, abroad, remote, hireWorkplace, experience, unspecifiedSwedenWorkplace, drivingLicenseRequired, larling, trainee, franchise, openForAll, sort)

                if (!ignore) {
                    setJobList((prev) => [...prev, ...data.hits])
                }
            } catch (error) {
                setError(true)
                console.error("error fetching from jobSearchAPI", error)
            }
        }
        if (query !== "") {
            getJobs(query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, activeGroupIDs, activeFieldID, abroad, remote, hireWorkplace, experience, unspecifiedSwedenWorkplace, drivingLicenseRequired, larling, trainee, franchise, openForAll, sort)
        }
        return () => ignore = true
    }, [query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, searchVersion, activeGroupIDs, activeFieldID, abroad, remote, hireWorkplace, experience, unspecifiedSwedenWorkplace, drivingLicenseRequired, larling, trainee, franchise, openForAll, sort])

    return (
        <div>
            <form className="mt-2" onSubmit={handleSubmit}>
                <label className=" block mb-0.5" htmlFor="jobSearch">Search for jobs here: </label>
                <div>
                    <input ref={jobSearchInputRef} defaultValue={query} className="border-black border rounded-md py-0.5 pl-1 bg-gray-50 focus-visible:outline-yellow-400" id="jobSearch" type="text"></input>
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
                    <FiltersDropdown
                        setJobList={setJobList}
                        setOffset={setOffset}
                        abroad={abroad}
                        setAbroad={setAbroad}
                        remote={remote}
                        setRemote={setRemote}
                        hireWorkplace={hireWorkplace}
                        setHireWorkplace={setHireWorkplace}
                        experience={experience}
                        setExperience={setExperience}
                        unspecifiedSwedenWorkplace={unspecifiedSwedenWorkplace}
                        setUnspecifiedSwedenWorkplace={setUnspecifiedSwedenWorkplace}
                        drivingLicenseRequired={drivingLicenseRequired}
                        setDrivingLicenseRequired={setDrivingLicenseRequired}
                        larling={larling}
                        setLarling={setLarling}
                        trainee={trainee}
                        setTrainee={setTrainee}
                        franchise={franchise}
                        setFranchise={setFranchise}
                        openForAll={openForAll}
                        setOpenForAll={setOpenForAll}
                        setSort={setSort}
                        sort={sort}
                    />
                </div>
            </div>
            <p>{error && "Error"}</p>
            {hasSearched && <JobList jobList={jobList} savedJobs={savedJobs} setSavedJobs={setSavedJobs} />}
            {hasMore && <button className="bg-amber-100 px-3 py-2 my-4 font-medium border-black border-1 rounded-md focus-visible:outline-yellow-400 cursor-pointer" onClick={() => setOffset((prev) => prev + 20)}>Load More</button>}
        </div>
    )
}
