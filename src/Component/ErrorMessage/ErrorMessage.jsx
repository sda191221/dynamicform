import React from 'react'
import classes from './ErrorMessage.module.css'
const ErrorMessage = (props) => {
    return (
        <div className={classes.err}>
            {props.children}
        </div>
    )
}

export default ErrorMessage
