import { JobList } from "./JobList.jsx";
import { useOutletContext } from "react-router";


export function SavedJobs() {
    const { savedJobs, setSavedJobs } = useOutletContext();

    return (
        <div>
            <JobList jobList={savedJobs} savedJobs={savedJobs} setSavedJobs={setSavedJobs} />
        </div>
    );
}
