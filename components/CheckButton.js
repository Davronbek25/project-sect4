import React from 'react'

export default function CheckBtn({ handleCheck, checkText, check, rightAns }) {
    return (
        <div id="check-container">
            {check && <span className="check-header">
                You scored {rightAns}/4 correct answers
            </span>}
            <button 
            className="check-btn"
            onClick={handleCheck}
            >
            {checkText}
            </button>
        </div>
    )
}