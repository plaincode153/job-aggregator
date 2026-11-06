import styles from "./ProfessionDropdown.module.css"
import { useEffect, useState } from "react"
import { getOccupationFields as getOccupationFieldsAPI, getOccupationGroups as getOccupationGroupsAPI } from "../api/api"

export function ProfessionDropdown({ setOffset, setJobList, setSearchVersion, activeGroupIDs, setActiveGroupIDs, activeFieldID, setActiveFieldID }) {
    const [isOpen, setIsOpen] = useState(false)
    const [previewProfessionID, setPreviewProfessionID] = useState()
    const [professionFields, setProfessionFields] = useState([])
    const [currentProfessionGroups, setCurrentProfessionGroups] = useState([])

    function handleProfessionFieldHover(occupationFieldID) {
        setPreviewProfessionID(occupationFieldID)
    }

    function handleSelectEntireField(occupationFieldID) {
        setOffset(0)
        setJobList([])
        setSearchVersion((prev) => prev + 1)
        setActiveGroupIDs([])
        setActiveFieldID(occupationFieldID)
    }

    function handleProfessionGroupClick(occupationGroupID) {
        setActiveFieldID()
        setOffset(0)
        setJobList([])
        setSearchVersion((prev) => prev + 1)
        setActiveGroupIDs((prev) =>
            prev.includes(occupationGroupID)
                ? prev.filter((id) => id !== occupationGroupID)
                : [...prev, occupationGroupID]
        )
    }

    function handleClearAllSelections() {
        setJobList([])
        setSearchVersion((prev) => prev + 1)
        setActiveFieldID()
        setActiveGroupIDs([])
    }

    useEffect(() => {
        let ignore = false

        async function getOccupationFields() {
            try {
                const data = await getOccupationFieldsAPI()
                if (!ignore) {
                    setProfessionFields(data)
                }
            } catch (error) {
                console.error("error fetching from getOccupationFields", error)
            }
        }
        getOccupationFields()

        return () => ignore = true
    }, [])

    useEffect(() => {
        let ignore = false;

        async function getOccupationGroups(previewProfessionID) {
            try {
                const data = await getOccupationGroupsAPI(previewProfessionID)
                if (!ignore) {
                    setCurrentProfessionGroups(data)
                }
            } catch (error) {
                console.error("error fetching from getOccupationGroups", error)
            }
        }

        getOccupationGroups(previewProfessionID)

        return () => ignore = true
    }, [previewProfessionID])


    return (
        <div className={styles.picker}>
            <button onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
                <span>Professions</span>
                <span>{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen &&
                <>
                    <button
                        onClick={handleClearAllSelections}>
                        <span>Clear all selections</span>
                    </button>
                    <div className={styles.columns}>
                        <div className={styles.occupationFields}>
                            <ul className= {styles.occupationFieldsList}>
                                {professionFields.map((field) => {
                                    return (
                                        <li>
                                            <button onClick={() => handleProfessionFieldHover(field["taxonomy/id"])}>
                                                <span>{field["taxonomy/preferred-label"]}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className={styles.occupationGroups}>
                            <ul className={styles.occupationGroupsList}>
                                <li>
                                    <button
                                        className={styles.occupationGroup}
                                        aria-pressed={Boolean(activeFieldID) && activeFieldID === previewProfessionID}
                                        onClick={() => handleSelectEntireField(previewProfessionID)}>
                                        <span>Select entire field</span>
                                    </button>
                                </li>
                                {currentProfessionGroups.map((group) => {
                                    return (
                                        <li>
                                            <button
                                                className={styles.occupationGroup}
                                                aria-pressed={activeGroupIDs.includes(group["taxonomy/id"])}
                                                onClick={() => handleProfessionGroupClick(group["taxonomy/id"])}>
                                                <span>{group["taxonomy/preferred-label"]}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
