

export async function jobSearchAPI(query) {
    const response = await fetch (`https://jobsearch.api.jobtechdev.se/search?q=${query}&offset=0&limit=10`)
    const data = response.json()
    return data
}