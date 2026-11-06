export async function jobSearchAPI(query, selectedRegionID, offset, setHasMore, selectedMunicipalityIDs, activeGroupIDs, activeFieldID) {
    const regionFilter = selectedRegionID ? `&region=${selectedRegionID}` : ""
    const occupationFieldFilter = activeFieldID ? `&occupation-field=${activeFieldID}` : ""
    const municipalityFilter = selectedMunicipalityIDs.length > 0   
        ? selectedMunicipalityIDs.map((municipalityID) => `&municipality=${municipalityID}`).join("")
        : ""
    const occupationGroupFilter = activeGroupIDs.length > 0
        ? activeGroupIDs.map((groupID) => `&occupation-group=${groupID}`).join("")
        : ""
    const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${query}&offset=${offset}&limit=20${regionFilter}${municipalityFilter}${occupationGroupFilter}${occupationFieldFilter}`)
    if (!response.ok) {
        throw new Error("Failed to fetch jobs")
    }
    const data = await response.json()

    if (offset + 20 >= data.total.value) {
        setHasMore(false)
    } else {
        setHasMore(true)
    }

    return data
}

export async function getRegions() {
    const response = await fetch(`https://taxonomy.api.jobtechdev.se/v1/taxonomy/specific/concepts/region?related-ids=i46j_HmG_v64&relation=narrower`)
    if (!response.ok) {
        throw new Error("Failed to fetch regions")
    }
    const data = response.json()
    return data
}

export async function getMunicipalities(regionID) {
    const response = await fetch(`https://taxonomy.api.jobtechdev.se/v1/taxonomy/specific/concepts/municipality?related-ids=${regionID}&relation=narrower`)
    if (!response.ok) {
        throw new error("Failed to fetch municipalities")
    }
    const data = response.json()
    return data
}

export async function getOccupationFields() {
    const response = await fetch(`https://taxonomy.api.jobtechdev.se/v1/taxonomy/main/concepts?type=occupation-field`)
    if (!response.ok) {
        throw new Error("Failed to fetch occupation fields")
    }
    const data = await response.json()
    return data
}

export async function getOccupationGroups(occupationFieldID) {
    const response = await fetch(`https://taxonomy.api.jobtechdev.se/v1/taxonomy/main/concepts?related-ids=${occupationFieldID}&relation=narrower`)
    if (!response.ok) {
        throw new Error("Failed to fetch occupation groups")
    }
    const data = await response.json()
    return data
}
