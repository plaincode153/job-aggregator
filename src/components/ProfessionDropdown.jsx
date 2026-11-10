import { useEffect, useRef, useState } from "react"
import { getOccupationFields as getOccupationFieldsAPI, getOccupationGroups as getOccupationGroupsAPI } from "../api/api"

export function ProfessionDropdown({ setOffset, setJobList, activeGroupIDs, setActiveGroupIDs, activeFieldID, setActiveFieldID }) {
    const [isOpen, setIsOpen] = useState(false)
    const [previewProfessionID, setPreviewProfessionID] = useState()
    const [professionFields, setProfessionFields] = useState([])
    const [currentProfessionGroups, setCurrentProfessionGroups] = useState([])

    const [isFieldLoading, setIsFieldLoading] = useState(true)
    const [groupLoading, setGroupLoading] = useState(false)
    const [fieldError, setFieldError] = useState(false)
    const [groupError, setGroupError] = useState(false)

    const clearButtonRef = useRef(null)
    const selectButtonRef = useRef(null)
    const wholeButtonRef = useRef(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleMouseDown(event) {
            dropdownRef.current.contains(event.target) ? null : setIsOpen(false)
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleMouseDown)
        }
        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) {
            setCurrentProfessionGroups([])
            setPreviewProfessionID()
        }
    }, [isOpen])

    function handleFieldNavigation(event) {
        if (event.key === "ArrowRight") {
            wholeButtonRef.current?.focus()
        }
        if (event.key === "ArrowDown") {
            event.preventDefault()

            if (selectButtonRef.current === event.currentTarget) {
                isOpen === true ? clearButtonRef.current.focus() : setIsOpen(true)
            } else {
                event.target.parentElement.nextElementSibling?.firstElementChild.focus()
            }
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            event.currentTarget === clearButtonRef.current ? selectButtonRef.current.focus() : null
            event.target.parentElement.previousElementSibling?.firstElementChild.focus()
        }
    }

    function handleGroupNavigation(event) {
        if (event.key === "ArrowLeft") {
            event.preventDefault()
            clearButtonRef.current.focus()
        }
        if (event.key === "ArrowDown") {
            event.preventDefault()
            if (!event.currentTarget.parentElement.nextElementSibling) {
                wholeButtonRef.current.focus()
            } else {
                event.currentTarget.parentElement.nextElementSibling.firstElementChild.focus()
            }
        }
        if (event.key === "ArrowUp") {
            event.preventDefault()
            if (event.currentTarget === wholeButtonRef.current) {
                event.currentTarget.parentElement.parentElement.lastElementChild.firstElementChild.focus()
            } else {
                event.target.parentElement.previousElementSibling?.firstElementChild.focus()
            }
        }
    }

    function handleProfessionFieldHover(occupationFieldID) {
        setPreviewProfessionID(occupationFieldID)
    }

    function handleSelectEntireField(occupationFieldID) {
        setOffset(0)
        setJobList([])
        setActiveGroupIDs([])
        setActiveFieldID(occupationFieldID)
    }

    function handleProfessionGroupClick(occupationGroupID) {
        setActiveFieldID()
        setOffset(0)
        setJobList([])
        setActiveGroupIDs((prev) =>
            prev.includes(occupationGroupID)
                ? prev.filter((id) => id !== occupationGroupID)
                : [...prev, occupationGroupID]
        )
    }

    function handleClearAllSelections() {
        setOffset(0)
        setJobList([])
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
                if (!ignore) {
                    setFieldError(true)
                }
                console.error("error fetching from getOccupationFields", error)
            } finally {
                if (!ignore) {
                    setIsFieldLoading(false)
                }
            }
        }
        getOccupationFields()

        return () => ignore = true
    }, [])

    useEffect(() => {
        let ignore = false;

        async function getOccupationGroups(previewProfessionID) {
            try {
                if (!previewProfessionID) return;
                setCurrentProfessionGroups([])
                setGroupError(false)
                setGroupLoading(true)
                const data = await getOccupationGroupsAPI(previewProfessionID)
                if (!ignore) {
                    setCurrentProfessionGroups(data)
                }
            } catch (error) {
                if (!ignore) {
                    setGroupError(true)
                }
                console.error("error fetching from getOccupationGroups", error)
            } finally {
                if (!ignore) {
                    setGroupLoading(false)
                }
            }
        }

        getOccupationGroups(previewProfessionID)

        return () => ignore = true
    }, [previewProfessionID])


    return (
        <div
            className="relative"
            ref={dropdownRef}
            onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                    selectButtonRef.current.focus()
                    setIsOpen(false)
                }
            }}>
            <button
                aria-expanded={isOpen}
                onKeyDown={handleFieldNavigation}
                ref={selectButtonRef}
                className="border-black border rounded-md py-0.5 bg-gray-50 focus-visible:outline-yellow-400 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}>
                <span className="pl-1">Professions</span>
                <span className="px-1">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen &&
                <>
                    <div className="flex gap-2 h-[600px] w-[450px] absolute mt-1 rounded-md pt-0.5 bg-white border border-gray-500 px-1">
                        <div className="overflow-auto">
                            {isFieldLoading && <p>Profession fields are loading</p>}
                            {fieldError && <p>Failed to load profession fields</p>}
                            <ul>
                                <li>
                                    <button
                                        ref={clearButtonRef}
                                        onKeyDown={handleFieldNavigation}
                                        className="my-0.5 border rounded-md px-1 bg-amber-100 focus-visible:outline-yellow-400 cursor-pointer"
                                        onClick={handleClearAllSelections}>
                                        <span>Clear all selections</span>
                                    </button>
                                </li>
                                {professionFields.map((field) => {
                                    return (
                                        <li>
                                            <button
                                                onKeyDown={handleFieldNavigation}
                                                className="my-0.5 overflow-auto border rounded-md px-1 focus-visible:outline-yellow-400 cursor-pointer"
                                                onClick={() => handleProfessionFieldHover(field["taxonomy/id"])}>
                                                <span>{field["taxonomy/preferred-label"]}</span>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="overflow-auto">
                            {groupLoading && <p>Profession groups are loading</p>}
                            {groupError && <p>Failed to load profession groups</p>}
                            <ul>
                                <li>
                                    {currentProfessionGroups.length > 0 &&
                                        <button
                                            ref={wholeButtonRef}
                                            onKeyDown={handleGroupNavigation}
                                            className="my-0.5 border rounded-md px-1 aria-pressed:bg-amber-300 aria-pressed:font-bold focus-visible:outline-yellow-400 cursor-pointer"
                                            aria-pressed={Boolean(activeFieldID) && activeFieldID === previewProfessionID}
                                            onClick={() => handleSelectEntireField(previewProfessionID)}>
                                            <span>Select entire field</span>
                                        </button>
                                    }
                                </li>
                                {currentProfessionGroups.map((group) => {
                                    return (
                                        <li>
                                            <button
                                                onKeyDown={handleGroupNavigation}
                                                className="my-0.5 border rounded-md px-1 aria-pressed:bg-amber-300 aria-pressed:font-bold focus-visible:outline-yellow-400 cursor-pointer"
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
