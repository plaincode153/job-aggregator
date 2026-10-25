import { getRegionsAPI } from "../api/api"
import { useEffect, useState } from "react"

export function LocationDropdown({ setSelectedRegionID }) {
    const [regions, setRegions] = useState([])

    function handleChange(event) {
        setSelectedRegionID(event.target.value)
    }

    useEffect(() => {
        let ignore = false

        async function getRegions() {
            try {
                const data = await getRegionsAPI()

                if (!ignore) {
                    setRegions(data)
                    /* console.log(data) */
                }

            } catch {
                console.error(`error fetching from getRegions`, error)
            }
        }
        getRegions()
        return () => ignore = true
    }, [])

    return (
        <select onChange={handleChange}>
            <option value="">
                All regions
            </option>
            {regions.map((region) => {
                return (
                    <option key={region["taxonomy/id"]} value={region["taxonomy/id"]}>
                        {region["taxonomy/preferred-label"]}
                    </option>
                )
            })}
        </select>
    )
}