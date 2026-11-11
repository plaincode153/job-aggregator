import fallbackLogo from "../assets/fallbackLogo.png";
import DOMPurify from "dompurify";

export function JobList({ jobList, savedJobs, setSavedJobs }) {
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
                            <div>
                                <button
                                    className="border rounded-md px-2 py-1 bg-white aria-pressed:bg-amber-300 focus-visible:outline-yellow-400 cursor-pointer"
                                    onClick={() => setSavedJobs((prev) =>
                                        prev.some((ea) => ea.id === job.id)
                                            ? prev.filter(ev => ev.id !== job.id)
                                            : [...prev, job]
                                    )}
                                    aria-pressed={savedJobs.some(savedJob => savedJob.id === job.id)}
                                    >Save job</button>
                            </div>

                        </summary>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description?.text_formatted) || `<p>"Description unavailable"</p>` }} ></div>
                    </details>
                )
            })}
        </div >
    )
}
