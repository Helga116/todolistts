import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

function AddItemForm(props: AddItemFormPropsType) {
    const inputRef = useRef(null)
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            props.addItem(title)
            setTitle("")
        }
    }
    const addTask = () => {
        debugger
        if (title.trim() === "") {
            setError("Should not be empty")
            return
        }
        props.addItem(title.trim())
        setTitle("")
    }
    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={error ? "error" : ""}
                ref={inputRef}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
export default AddItemForm