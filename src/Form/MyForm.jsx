import React, { useEffect, useState } from 'react';
import data from './data'
import Input from '../Component/Input/Input'
import Button from '../Component/Button/Button'
import './MyForm.css'
import Label from '../Component/Label/Label';
import input from '../Component/Input/Input';
import ErrorMessage from '../Component/ErrorMessage/ErrorMessage';


const MyForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isReset, setIsReset] = useState(false);

    const [values, setValues] = useState({});

    const [errMsg, setErrMsg] = useState({});


    const inputChangedHandler = (event, formElement) => {


        setValues((values) => ({
            ...values,
            [formElement.label]: event.target.value,
        }));

        let newValue = formElement.label;
        // setValues({ ...values, [newValue]: event.target.value });
        //console.log(values);
        let msg = "";
        let regEx = (/\S+@\S+\.\S+/);
        let length = event.target.value.length;

        //console.log(values);
        //console.log(formElement.validations);
        if (formElement.label === 'Country' || formElement.label === 'Gender') {
            msg = "";
            setErrMsg({ ...errMsg, [newValue]: msg });

        }
        else {

            formElement.validations.map((validation) => {

                if (event.target.value === '') {
                    if (validation.type === 'required') {
                        msg = validation.params[0];
                        console.log(msg);
                        setErrMsg({ ...errMsg, [newValue]: msg });
                        // console.log(errMsg);
                    }
                }

                if (validation.type === 'min') {
                    if (length < validation.params[0] && length > 0) {
                        msg = validation.params[1];
                        //console.log(msg);
                        setErrMsg({ ...errMsg, [newValue]: msg });
                    }

                }
                if (validation.type === 'max') {
                    if (length > validation.params[0]) {
                        msg = validation.params[1];
                        //console.log(msg);
                        setErrMsg({ ...errMsg, [newValue]: msg });
                    }

                }

                if (validation.type === 'isValid' && event.target.value != '') {
                    if (!(regEx.test(values[formElement.label]))) {
                        msg = validation.params;
                        //console.log(msg);
                        setErrMsg({ ...errMsg, [newValue]: msg });
                    }
                }

            })
        }
        //console.log(errMsg);
        setErrMsg((errMsg) => ({
            ...errMsg,
            [formElement.label]: msg,
        }));

        console.log(errMsg);
    }
    const checkValidity = () => {
        let valid = true;
        if (submitted) {
            valid = false;
        }
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
        setValues({});
    }
    const doReset = (e) => {
        //e.preventDefault();
        setValues({});
        setErrMsg({});
        setIsReset(true);
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
                            value={(submitted) ? "" : values[formElement.label]}
                            errorMessage={(submitted) ? "" : errMsg}
                            //validationType={formElement.validationType}
                            //validations={formElement.validations}
                            //touched={formElement.config.touched}
                            changed={(event) => inputChangedHandler(event, formElement)}
                            formSubmitted={submitted}
                            isReset={isReset}
                        />

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
