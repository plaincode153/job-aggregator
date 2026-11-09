import fallbackLogo from "../assets/fallbackLogo.png";

export function JobList({ jobList }) {
    if (jobList.length === 0) {
        return <p>No jobs matched your search. Try different keywords.</p>
    }
    return (
        <div>
            {jobList.map((job) => {

                return (
                    <details key={job.id}>
                        <summary className="bg-gray-200 my-1 py-1 pl-2 rounded-2xl">
                            <img
                            className="w-30 h-30 object-contain inline-block "
                                src={job.logo_url || fallbackLogo}
                                onError={(event) => {
                                    event.currentTarget.src = fallbackLogo
                                }}>
                            </img>

                            <h2>{job.headline || "Job title unavailable"}</h2>
                            <h3>Location: {job.workplace_address.municipality || "unavailable"}</h3>

                            {job.webpage_url
                                ? <a href={job.webpage_url}>Apply here!</a>
                                : <p>link unavailable</p>
                            }

                        </summary>
                        <div dangerouslySetInnerHTML={{ __html: job.description?.text_formatted || `<p>"Description unavailable"</p>` }} ></div>
                    </details>
                )
            })}
        </div >
    )
}
