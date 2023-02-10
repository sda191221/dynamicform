import React from 'react'
import './Label.css'

const Label = (props) => {
    return (
        <div className="label">
            {props.value}
        </div>
    )
}

export default Label;
