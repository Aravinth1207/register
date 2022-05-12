import React, { useState } from 'react'
import { updateVal } from './formSlice';
import { useDispatch, useSelector } from 'react-redux';


const PD = () => {
    const [name, setName] = useState(useSelector(state => state.form.name));
    const [email, setEmail] = useState(useSelector(state => state.form.email));
    const [phone, setPhone] = useState(useSelector(state => state.form.phone));
    const [password, setPassword] = useState(useSelector(state => state.form.password));
    const [city, setCity] = useState(useSelector(state => state.form.password));
    const dispatch = useDispatch();
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateVal({ name, email, phone, password, city }));
    }

    const [nvalid, nSetValid] = React.useState(false);
    const [evalid, eSetValid] = React.useState(false);
    const [eCheck, eSetCheck] = React.useState(false);
    const [phvalid, phSetValid] = React.useState(false);
    const [phCheck, phSetCheck] = React.useState(false);
    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const check = (type, value) => {
        fetch(`http://localhost:8080/${type}/${value}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            }
        })
            .then(res => res.json()).then
            (data => {
                if (data) {
                    if (type === "email") {
                        eSetCheck(true);
                    }
                    else if (type === "phone") {
                        phSetCheck(true);
                    }
                }
                else if (!data) {
                    if (type === "email") {
                        eSetCheck(false);
                    }
                    else if (type === "phone") {
                        phSetCheck(false);
                    }
                }
            }
            ).catch((err) => {
                console.log("Not Registered");
            });
    }

    const inputElements = [
        {
            className: "name",
            htmlFor: "Name",
            placeholder: "Name",
            type: "text",
            name: "name",
            defaultValue: name,
            onFocus: () => {
                nSetValid(false)
            },
            onChange: (e) => {
                setName(e.target.value);
            },
            onBlur: (e) => {
                handleUpdate(e)
                if (e.target.length < 3) {
                    nSetValid(true)
                }
                else {
                    nSetValid(false)
                }
            },
            valid: nvalid,
            error: "Name should be atleast 3 characters long"
        },
        {
            className: "email",
            htmlFor: "Email",
            placeholder: "Email",
            type: "email",
            name: "email",
            defaultValue: email,
            onChange: (e) => {
                setEmail(e.target.value);
            },
            onFocus: () => {
                eSetCheck(false);
                eSetValid(false);
            },
            onBlur: (e) => {
                handleUpdate(e)
                if (check("email", e.target.value)) {
                    eSetCheck(true);
                }
                else if (!(emailRegex.test(e.target.value)) || e.target.value.length < 0) {
                    eSetValid(true);
                }
                else {
                    eSetValid(false);
                }
            },
            valid: evalid,
            valid2: eCheck,
            error: "Email is Invalid",
            error2: "Email is already Registered"
        },
        {
            className: "phone",
            htmlFor: "Phone",
            placeholder: "Phone",
            type: "number",
            name: "phone",
            defaultValue: phone,
            onFocus: () => {
                phSetCheck(false);
                phSetValid(false);
            },
            onChange: (e) => {
                setPhone(e.target.value);
            },
            onBlur: (e) => {
                check("phone", phone);
                handleUpdate(e)
                if (e.target.value.length !== 10) {
                    phSetValid(true)
                }
                else {
                    phSetValid(false)
                }
            },
            valid: phvalid,
            valid2: phCheck,
            error: "Phone number should be 10 digits long",
            error2: "Phone number is already Registered"
        },
        {
            className: "city",
            htmlFor: "City",
            placeholder: "City",
            type: "text",
            name: "city",
            defaultValue: city,
            onChange: (e) => {
                e.preventDefault();
                setCity(e.target.value);
            },
            onBlur: (e) => { handleUpdate(e) }
        },
        {
            className: "password",
            htmlFor: "Password",
            placeholder: "Password",
            type: "password",
            name: "password",
            defaultValue: password,
            onChange: (e) => { setPassword(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }

        }

    ]

    return (

        <>
            <h1>Register Here</h1>
            <div className="form" >
                {
                    inputElements.map((i, index) => {
                        return (
                            <div key={index} className={i.className} >
                                <label htmlFor={i.htmlFor}>{i.placeholder}</label>
                                <input
                                    placeholder={i.placeholder}
                                    type={i.type}
                                    name={i.name}
                                    noValidate
                                    defaultValue={i.defaultValue}
                                    onChange={i.onChange}
                                    onBlur={i.onBlur}
                                    onFocus={i.onFocus}
                                    required
                                />
                                {i.valid ? <pre style={{ color: "red", fontFamily: "'San Francisco', Helvetica, Arial, san-serif" }}>{i.error}</pre> : ""}
                                {i.valid2 ? <pre style={{ color: "red", fontFamily: "'San Francisco', Helvetica, Arial, san-serif" }}>{i.error2}</pre> : ""}
                            </div>
                        )
                    })
                }
            </div>
        </ >

    )
}

export default PD