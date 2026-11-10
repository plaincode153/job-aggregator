import { getRegions as getRegionsAPI, getMunicipalities as getMunicipalitiesAPI } from "../api/api"
import { useEffect, useRef, useState } from "react"

export function LocationDropdown({ selectedRegionID, setSelectedRegionID, setOffset, setJobList, selectedMunicipalityIDs, setSelectedMunicipalityIDs }) {
    const [regions, setRegions] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [previewRegionID, setPreviewRegionID] = useState()
    const [currentMunicipalities, setCurrentMunicipalities] = useState([])
    const [isRegionLoading, setIsRegionLoading] = useState(true)
    const [municipalityLoading, setMunicipalityLoading] = useState(false)
    const [regionError, setRegionError] = useState(false)
    const [municipalityError, setMunicipalityError] = useState(false)

    const clearButtonRef = useRef(null)
    const selectButtonRef = useRef(null)
    const wholeButtonRef = useRef(null)
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

    useEffect(() => {
        if (!isOpen) {
            setCurrentMunicipalities([])
            setPreviewRegionID()
        }
    }, [isOpen])

    function handleRegionNavigation(event) {
        if (event.key === "ArrowRight") {
            wholeButtonRef.current?.focus()
        }
        if (event.key === "ArrowDown") {
            event.preventDefault()

            if (selectButtonRef.current === event.currentTarget) {
                isOpen === true ? clearButtonRef.current.focus() : setIsOpen(true)
            } else {
                event.target.parentElement.nextElementSibling?.firstElementChild.focus()
            }
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            event.currentTarget === clearButtonRef.current ? selectButtonRef.current.focus() : null
            event.target.parentElement.previousElementSibling?.firstElementChild.focus()
        }
    }

    function handleMunicipalityNavigation(event) {
        if (event.key === "ArrowLeft") {
            event.preventDefault()
            clearButtonRef.current.focus()
        }
        if (event.key === "ArrowDown") {
            event.preventDefault()
            if (!event.currentTarget.parentElement.nextElementSibling) {
                wholeButtonRef.current.focus()
            } else {
                event.currentTarget.parentElement.nextElementSibling.firstElementChild.focus()
            }
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            if (event.currentTarget === wholeButtonRef.current) {
                event.currentTarget.parentElement.parentElement.lastElementChild.firstElementChild.focus()
            } else {
                event.target.parentElement.previousElementSibling?.firstElementChild.focus()
            }
        }
    }

    function handleMunicipalityChange(municipalityID) {
        setOffset(0)
        setJobList([])
        setSelectedMunicipalityIDs((prev) =>
            prev.includes(municipalityID)
                ? prev.filter((id) => id !== municipalityID)
                : [...prev, municipalityID]
        )
        setSelectedRegionID()
    }

    function selectWholeRegion(regionID) {
        setOffset(0)
        setJobList([])
        setSelectedRegionID(regionID)
        setSelectedMunicipalityIDs([])
    }

    function clearAllLocations() {
        setOffset(0)
        setSelectedMunicipalityIDs([])
        setSelectedRegionID("")
        setJobList([])
    }

    useEffect(() => {
        let ignore = false

        async function getRegions() {
            try {
                const data = await getRegionsAPI()

                if (!ignore) {
                    setRegions(data)
                }
            } catch (error) {
                if (!ignore) {
                    setRegionError(true)
                }
                console.error(`error fetching from getRegions`, error)
            } finally {
                if (!ignore) {
                    setIsRegionLoading(false)
                }
            }
        }

        getRegions()
        return () => ignore = true
    }, [])

    useEffect(() => {
        let ignore = false

        async function getMunicipalities(previewRegionID) {
            try {
                if (!previewRegionID) return;
                setCurrentMunicipalities([])
                setMunicipalityError(false)
                setMunicipalityLoading(true)
                const data = await getMunicipalitiesAPI(previewRegionID)
                if (!ignore) {
                    setCurrentMunicipalities(data)
                }
            } catch (error) {
                if (!ignore) {
                    setMunicipalityError(true)
                }
                console.error(`error fetching from getMunicipalities`, error)
            } finally {
                if (!ignore) {
                    setMunicipalityLoading(false)
                }
            }
        }

        getMunicipalities(previewRegionID)
        return () => ignore = true
    }, [previewRegionID])

    return (
        <div
            className="relative" 
            ref={dropdownRef}
            onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                    selectButtonRef.current.focus()
                    setIsOpen(false)
                }
            }}>
            <button
                aria-expanded={isOpen}
                onKeyDown={handleRegionNavigation}
                ref={selectButtonRef}
                className="border-black border rounded-md py-0.5 bg-gray-50 focus-visible:outline-yellow-400 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}>
                <span className="pl-1">Select your locations</span>
                <span className="px-1">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen &&
                <div className="flex gap-2 h-[600px] w-[450px] absolute mt-1 rounded-md pt-0.5 bg-white border border-gray-500 px-1">
                    <div className="overflow-auto">
                        {isRegionLoading && <p>Regions are loading</p>}
                        {regionError && <p>Failed to load regions</p>}
                        <ul>
                            <li>
                                <button
                                    ref={clearButtonRef}
                                    onKeyDown={handleRegionNavigation}
                                    className="my-0.5 border rounded-md px-1 bg-amber-100 focus-visible:outline-yellow-400 cursor-pointer"
                                    onClick={clearAllLocations}>Clear all locations</button>
                            </li>
                            {regions.map((region) => {
                                return (
                                    <li>
                                        <button
                                            onKeyDown={handleRegionNavigation}
                                            className="my-0.5 border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                            onClick={() => setPreviewRegionID(region["taxonomy/id"])}>
                                            <span>{region["taxonomy/definition"]}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="overflow-auto">
                        {municipalityLoading && <p>Municipalities are loading</p>}
                        {municipalityError && <p>Failed to load municipalities</p>}
                        <ul>
                            <li>
                                {currentMunicipalities.length > 0 &&
                                    <button
                                        ref={wholeButtonRef}
                                        onKeyDown={handleMunicipalityNavigation}
                                        className="my-0.5 border rounded-md px-1 aria-pressed:bg-amber-300 aria-pressed:font-bold focus-visible:outline-yellow-400 cursor-pointer"
                                        aria-pressed={Boolean(selectedRegionID) && selectedRegionID === previewRegionID}
                                        onClick={() => selectWholeRegion(previewRegionID)}>
                                        <span>Select whole region</span>
                                    </button>
                                }
                            </li>
                            {currentMunicipalities.map((municipality) => {
                                return (
                                    <li>
                                        <button
                                            onKeyDown={handleMunicipalityNavigation}
                                            className="my-0.5 border rounded-md px-1 aria-pressed:bg-amber-300 aria-pressed:font-bold focus-visible:outline-yellow-400 cursor-pointer"
                                            aria-pressed={selectedMunicipalityIDs.includes(municipality["taxonomy/id"])}
                                            onClick={() => handleMunicipalityChange(municipality["taxonomy/id"])}>
                                            <span>{municipality["taxonomy/definition"]}</span>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>

                    </div>
                </div>
            }
        </div >
    )
}
