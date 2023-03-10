import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];
    const [focused, setFocused] = useState(false);

    // let errorFocus = (props.value) ? "" : [props.element.label] + " is required";
    // const handleFocus = (e) => {
    //     setFocused(true);
    // }

    switch (props.element.type) {
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                    key={props.element.id}
                    // onBlur={handleFocus}
                    // focused={focused.toString()}
                    value={props.value}>
                    <option>{props.element.placeholder}</option>
                    {props.element.options.map(option => (
                        <option key={option.value} value={option.label}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('radio'):
            inputElement = (
                //className = { inputClasses.join(' ') }   

                props.element.options.map(option => (
                    <label className={classes.radio} >
                        <input
                            key={option.value}
                            type="radio"
                            value={option.value}
                            name={props.element.label}
                            onChange={props.changed}
                            // onBlur={handleFocus}
                            // focused={focused.toString()}
                            checked={props.value === option.value}
                        />
                        {option.label}
                    </label>


                ))
            );
            break;
        default:
            inputElement = <input
                key={props.element.id}
                type={props.element.type}
                value={props.value}
                className={inputClasses.join(' ')}
                placeholder={props.element.placeholder}
                onChange={props.changed}
                maxlength={(props.element.id === "name" || props.element.id === "mobileno") ? "12" : "30"}
            // onBlur={handleFocus}
            // focused={focused.toString()}
            />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label} key={props.element.label}>{props.element.label}</label><br />
            <div>{inputElement}</div>
            {props.errorMessage ? <ErrorMessage>{props.errorMessage[props.element.label]}</ErrorMessage> : <span></span>}
            {/* {!props.formSubmitted || !props.isReset ? <span className={(focused ? classes.show : classes.hide)}> <ErrorMessage>{errorFocus}</ErrorMessage></span> : ""} */}
        </div>
    );

};

export default input;