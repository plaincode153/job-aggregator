export async function jobSearchAPI(query, selectedRegionID) {
    const regionFilter = selectedRegionID ? `&region=${selectedRegionID}` : ""
    const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${query}&offset=0&limit=10${regionFilter}`)
    if (!response.ok) {
        throw new Error("Failed to fetch jobs")
    }
    const data = response.json()
    return data
}

export async function getRegionsAPI() {
    const response = await fetch (`https://taxonomy.api.jobtechdev.se/v1/taxonomy/specific/concepts/region?related-ids=i46j_HmG_v64&relation=narrower`)
    if (!response.ok) {
        throw new Error("Failed to fetch regions")
    }
    const data = response.json()
    return data
}
