import styles from "./JobList.module.css"

export function JobList({ jobList }) {
    return (
        <div className={styles.jobList}>
            {jobList.map((job) => {
                console.log(job)
                return (
                    <div className={styles.job} key={job.id}>
                        <img src={job.logo_url}></img>
                        <h2>{job.headline}</h2>
                        <div dangerouslySetInnerHTML={{__html: job.description.text_formatted}}></div>
                    </div>
                )
            })}
        </div>

    )
}