import styles from "./JobList.module.css"
import fallbackLogo from "../assets/fallback-logo.png";

export function JobList({ jobList }) {
    if (jobList.length === 0) {
        return <p>No jobs matched your search. Try different keywords.</p>
    }
    return (
        <div className={styles.jobList}>
            {jobList.map((job) => {
                console.log(job)

                return (
                    <details className={styles.job} key={job.id}>
                        <summary>
                            <img
                            src={job.logo_url || fallbackLogo}
                            onError={(event) => {
                                event.currentTarget.src = fallbackLogo
                            }}>
                            </img>

                            <h2>{job.headline || "Job title unavailable"}</h2>
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
