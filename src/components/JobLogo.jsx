import styles from "./JobLogo.module.css"

export function JobLogo({ jobImg }) {
    return <img className={styles.jobImg} src={jobImg}></img>
}