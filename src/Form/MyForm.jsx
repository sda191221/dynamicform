import React, { useState } from 'react';
import data from './data'
import Input from './Component/Input/Input'
import Button from './Component/Button/Button'
import './MyForm.css'
import Label from './Component/Label/Label';
import input from './Component/Input/Input';


const MyForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const [values, setValues] = useState(
        { 'Full Name': '', 'Mobile Number': '', 'Email': '', 'Gender': '', 'Country': '' }
    );
    const [errMsg, setErrMsg] = useState(
        { 'Full Name': 'Full Name is required', 'Mobile Number': 'Mobile Number is required', 'Email': 'Email is required', 'Gender': 'Gender is required', 'Country': 'Country is required' }
    );
    //console.log(values);

    const inputChangedHandler = (event, formElement) => {
        let newValue = formElement.label;
        setValues({ ...values, [newValue]: event.target.value });
        let msg = "";
        let regEx = (/\S+@\S+\.\S+/);
        let length = values[formElement.label].length;

        //console.log(values);
        //console.log(formElement.validations);
        if (formElement.label === 'Country' || formElement.label === 'Gender') {
            msg = "";
        }
        else {
            formElement.validations.map((validation) => {
                if (validation.type === 'required') {
                    if (values[formElement.label] === '') {
                        msg = validation.params;
                        //console.log(msg);
                        //setErrMsg({ ...errMsg, [newValue]: msg });
                    }
                }

                if (validation.type === 'min') {
                    if (length < validation.params[0] - 1) {
                        msg = validation.params[1];
                        //console.log(msg);
                        //setErrMsg({ ...errMsg, [newValue]: msg });
                    }

                }
                if (validation.type === 'max') {
                    if (length > validation.params[0] - 1) {
                        msg = validation.params[1];
                        //console.log(msg);
                        //setErrMsg({ ...errMsg, [newValue]: msg });
                    }

                }

                if (validation.type === 'isValid') {
                    if (!(regEx.test(values[formElement.label]))) {
                        msg = validation.params;
                        //console.log(msg);
                        //setErrMsg({ ...errMsg, [newValue]: msg });
                    }
                }


            })

        }
        setErrMsg({ ...errMsg, [formElement.label]: msg });
        //console.log(errMsg);
    }
    const checkValidity = () => {
        let valid = true;
        data.map((element) => {
            if (errMsg[element.label] != "") {
                valid = false;
            }

        })
        return valid;

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(checkValidity());
        setSubmitted(true);
        setValues({ 'Full Name': '', 'Mobile Number': '', 'Email': '', 'Gender': '', 'Country': '' });
    }
    const doReset = () => {
        e.preventDefault();
        setValues({ 'Full Name': '', 'Mobile Number': '', 'Email': '', 'Gender': '', 'Country': '' });
        setFocus(false);
    }

    let form =
        (
            <form>
                {data.map(formElement => (
                    <div>
                        <Input
                            key={formElement.id}
                            //id={formElement.id}
                            //label={formElement.label}
                            //placeholder={formElement.placeholder}
                            //type={formElement.type}
                            element={formElement}
                            value={values[formElement.label]}
                            errorMessage={errMsg}
                            //validationType={formElement.validationType}
                            //validations={formElement.validations}
                            //touched={formElement.config.touched}
                            changed={(event) => inputChangedHandler(event, formElement)}
                            formSubmitted={submitted}
                        />
                        {/* <ErrorMessage>{errMsg[formElement.label]}</ErrorMessage> */}
                    </div>
                ))}
                <div className='buttonDiv'>
                    <Button btnType="submit" clicked={handleSubmit} disabled={!checkValidity()}>Submit</Button>
                    <Button btnType="reset" clicked={doReset}>Reset</Button>
                </div>
            </form >
        )
    let preview = (
        <div>
            {data.map(formElement => (
                <div className="previewCard">
                    <Label value={formElement.label} />
                    <Label value={values[formElement.label]} />

                </div>
            ))}


        </div>
    )
    return (
        <div className="main">
            <div className="form">  {form} </div>
            <div className="preview">{preview} </div>
        </div>
    )
}

export default MyForm
