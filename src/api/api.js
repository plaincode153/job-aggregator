

export async function jobSearchAPI(query) {
    const response = await fetch(`https://jobsearch.api.jobtechdev.se/search?q=${query}&offset=0&limit=10`)
    if (!response.ok) {
        throw new Error("Failed to fetch jobs")
    }
    const data = response.json()
    return data
}