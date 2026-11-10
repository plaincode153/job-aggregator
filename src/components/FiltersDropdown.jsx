import { useEffect, useRef, useState } from "react"

export function FiltersDropdown({
    setJobList,
    setOffset,
    abroad,
    setAbroad,
    remote,
    setRemote,
    hireWorkplace,
    setHireWorkplace,
    experience,
    setExperience,
    unspecifiedSwedenWorkplace,
    setUnspecifiedSwedenWorkplace,
    drivingLicenseRequired,
    setDrivingLicenseRequired,
    larling,
    setLarling,
    trainee,
    setTrainee,
    franchise,
    setFranchise,
    openForAll,
    setOpenForAll,
    setSort,
    sort
}) {
    const [isOpen, setIsOpen] = useState(false)
    const filterRefs = useRef([])
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleMouseDown(event) {
            dropdownRef.current.contains(event.target) ? null : setIsOpen(false)
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleMouseDown)
        }
        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
        }
    }, [isOpen])

    function handleFilterNavigation(event) {
        let index = filterRefs.current.indexOf(event.target)
        if (event.key === "ArrowUp") {
            event.preventDefault()
            filterRefs.current[index - 1]?.focus()
        }
        if (event.key === "ArrowDown") {
            event.preventDefault()
            if (event.currentTarget === filterRefs.current[0]) {
                isOpen === true ? filterRefs.current[1].focus() : setIsOpen(true)
            } else {
                filterRefs.current[index + 1]?.focus()
            }
        }
    }

    function handleClearAllFilters() {
        setAbroad(false)
        setRemote("")
        setHireWorkplace("")
        setExperience("")
        setUnspecifiedSwedenWorkplace(false)
        setDrivingLicenseRequired("")
        setLarling("")
        setTrainee("")
        setFranchise("")
        setOpenForAll("")
        setSort("")
        setOffset(0)
        setJobList([])
    }

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                    filterRefs.current[0].focus()
                    setIsOpen(false)
                }
            }}>
            <button
                aria-expanded={isOpen}
                ref={(element) => { filterRefs.current[0] = element }}
                onKeyDown={handleFilterNavigation}
                className="border-black border rounded-md py-0.5 bg-gray-50 focus-visible:outline-yellow-400 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}>
                Filters
                <span>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen &&
                <div className="flex gap-2 h-[600px] w-[450px] absolute mt-1 rounded-md pt-0.5 bg-white border border-gray-500 px-1">
                    <ul>
                        <li>
                            <button
                                ref={(element) => { filterRefs.current[1] = element }}
                                onKeyDown={handleFilterNavigation}
                                className="my-0.5 border rounded-md px-1 bg-amber-100 focus-visible:outline-yellow-400 cursor-pointer"
                                onClick={handleClearAllFilters}>Clear all filters</button>
                        </li>
                        <li>
                            <label>
                                Trainee
                                <select
                                    ref={(element) => { filterRefs.current[2] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(trainee)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setTrainee(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Franchise
                                <select
                                    ref={(element) => { filterRefs.current[3] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(franchise)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setFranchise(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Open for all
                                <select
                                    ref={(element) => { filterRefs.current[4] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(openForAll)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setOpenForAll(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Driver's license required
                                <select
                                    ref={(element) => { filterRefs.current[5] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(drivingLicenseRequired)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setDrivingLicenseRequired(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Remote
                                <select
                                    ref={(element) => { filterRefs.current[6] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(remote)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setRemote(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Hire workplace
                                <select
                                    ref={(element) => { filterRefs.current[7] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(hireWorkplace)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setHireWorkplace(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Experience
                                <select
                                    ref={(element) => { filterRefs.current[8] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(experience)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setExperience(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                Apprentice
                                <select
                                    ref={(element) => { filterRefs.current[9] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                    value={String(larling)}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setLarling(event.target.value === "" ? "" : event.target.value === "true")
                                    }}>
                                    <option value="">Any</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <button
                                ref={(element) => { filterRefs.current[10] = element }}
                                onKeyDown={handleFilterNavigation}
                                className="my-0.5 border rounded-md px-1 aria-pressed:bg-amber-300 aria-pressed:font-bold focus-visible:outline-yellow-400 cursor-pointer"
                                aria-pressed={abroad}
                                onClick={() => {
                                    setJobList([])
                                    setOffset(0)
                                    setAbroad((prev) => !prev)
                                }}>Abroad</button>
                        </li>
                        <li>
                            <button
                                ref={(element) => { filterRefs.current[11] = element }}
                                onKeyDown={handleFilterNavigation}
                                className="my-0.5 border rounded-md px-1 aria-pressed:bg-amber-300 aria-pressed:font-bold focus-visible:outline-yellow-400 cursor-pointer"
                                aria-pressed={unspecifiedSwedenWorkplace}
                                onClick={() => {
                                    setJobList([])
                                    setOffset(0)
                                    setUnspecifiedSwedenWorkplace((prev) => !prev)
                                }}>Unspecified Sweden workplace</button>
                        </li>
                        <li>
                            <p className="underline">Sort</p>
                            <label className="block">
                                <input
                                    ref={(element) => { filterRefs.current[12] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    type="radio"
                                    name="sort"
                                    value="relevance"
                                    checked={sort === "relevance"}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setSort(event.target.value)
                                    }} />
                                Relevance (default)
                            </label>
                            <label className="block">
                                <input
                                    ref={(element) => { filterRefs.current[13] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    type="radio"
                                    name="sort"
                                    value="pubdate-desc"
                                    checked={sort === "pubdate-desc"}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setSort(event.target.value)
                                    }} />
                                Published date: newest first
                            </label>
                            <label className="block">
                                <input
                                    ref={(element) => { filterRefs.current[14] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    type="radio"
                                    name="sort"
                                    value="pubdate-asc"
                                    checked={sort === "pubdate-asc"}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setSort(event.target.value)
                                    }} />
                                Published date: oldest first
                            </label>
                            <label className="block">
                                <input
                                    ref={(element) => { filterRefs.current[15] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    type="radio"
                                    name="sort"
                                    value="applydate-desc"
                                    checked={sort === "applydate-desc"}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setSort(event.target.value)
                                    }} />
                                Application deadline: latest first
                            </label>
                            <label className="block">
                                <input
                                    ref={(element) => { filterRefs.current[16] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    type="radio"
                                    name="sort"
                                    value="applydate-asc"
                                    checked={sort === "applydate-asc"}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setSort(event.target.value)
                                    }} />
                                Application deadline: soonest first
                            </label>
                            <label className="block">
                                <input
                                    ref={(element) => { filterRefs.current[17] = element }}
                                    onKeyDown={handleFilterNavigation}
                                    type="radio"
                                    name="sort"
                                    value="updated"
                                    checked={sort === "updated"}
                                    onChange={(event) => {
                                        setJobList([])
                                        setOffset(0)
                                        setSort(event.target.value)
                                    }} />
                                Updated: newest first
                            </label>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}
