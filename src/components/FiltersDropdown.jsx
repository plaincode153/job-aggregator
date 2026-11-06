import styles from "./FiltersDropdown.module.css"

export function FiltersDropdown() {
    return (
        <div className={styles.picker}>
            <button className={styles.trigger}>Filters</button>
        </div>
    )
}
