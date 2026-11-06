import { getRegions as getRegionsAPI, getMunicipalities as getMunicipalitiesAPI } from "../api/api"
import { useEffect, useState } from "react"
import styles from "./LocationDropdown.module.css"

export function LocationDropdown({ selectedRegionID, setSelectedRegionID, setOffset, setJobList, selectedMunicipalityIDs, setSelectedMunicipalityIDs, setSearchVersion }) {
    const [regions, setRegions] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [previewRegionID, setPreviewRegionID] = useState()
    const [currentMunicipalities, setCurrentMunicipalities] = useState([])

    function handleMunicipalityChange(municipalityID) {
        setOffset(0)
        setJobList([])
        setSelectedMunicipalityIDs((prev) =>
            prev.includes(municipalityID)
                ? prev.filter((id) => id !== municipalityID)
                : [...prev, municipalityID]
        )
        setSelectedRegionID()
        setSearchVersion((prev) => prev + 1)
    }

    function selectWholeRegion(regionID) {
        setOffset(0)
        setJobList([])
        setSelectedRegionID(regionID)
        setSelectedMunicipalityIDs([])
        setSearchVersion((prev) => prev + 1)
    }

    function clearAllLocations() {
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
                console.error(`error fetching from getRegions`, error)
            }
        }

        getRegions()
        return () => ignore = true
    }, [])

    useEffect(() => {
        let ignore = false

        async function getMunicipalities(previewRegionID) {
            try {
                const data = await getMunicipalitiesAPI(previewRegionID)
                if (!ignore) {
                    setCurrentMunicipalities(data)
                }
            } catch (error) {
                console.error(`error fetching from getMunicipalities`, error)
            }
        }

        getMunicipalities(previewRegionID)
        return () => ignore = true
    }, [previewRegionID])

    return (
        <div className={styles.picker}>
            <button onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
                <span>Select your locations</span>
                <span>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen &&
                <div>
                    <div>
                        <button onClick={clearAllLocations}>Clear all locations</button>
                    </div>
                    <div className={styles.columns}>
                        <div className="regions">
                            <ul className={styles.locationList}>
                                {regions.map((region) => {
                                    return (
                                        <li>
                                            <button onClick={() => setPreviewRegionID(region["taxonomy/id"])}>
                                                <span>{region["taxonomy/definition"]}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="municipalities">
                            <ul className={styles.locationList}>
                                <li>
                                    <button
                                        className={styles.location}
                                        aria-pressed={Boolean(selectedRegionID) && selectedRegionID === previewRegionID}
                                        onClick={() => selectWholeRegion(previewRegionID)}>
                                        <span>Select whole region</span>
                                    </button>
                                </li>
                                {currentMunicipalities.map((municipality) => {
                                    return (
                                        <li>
                                            <button
                                                className={styles.location}
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
                </div>
            }
        </div >
    )
}
