import React, { useState } from 'react'
import { updateVal2 } from './formSlice3';
import { useDispatch, useSelector } from 'react-redux';

const EMPD = () => {
    const [companyname, setCompanyname] = useState(useSelector(state => state.form3.companyname));
    const [salary, setSalary] = useState(useSelector(state => state.form3.salary));
    const [jobtype, setJobtype] = useState(useSelector(state => state.form3.jobtype));
    const [designation, setDesignation] = useState(useSelector(state => state.form3.designation));
    const dispatch = useDispatch();

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateVal2({ companyname, salary, jobtype, designation }));
    }

    const inputElements = [
        {
            label: "Company",
            className: "name",
            htmlFor: "Company Name",
            placeholder: "Company Name",
            type: "text",
            name: "companyname",
            defaultValue: companyname,
            onChange: (e) => {
                e.preventDefault();
                setCompanyname(e.target.value)
            },
            onBlur: (e) => { handleUpdate(e) }
        },
        {
            label: "Salary",
            className: "name",
            htmlFor: "Salary",
            placeholder: "Salary",
            type: "number",
            name: "salary",
            defaultValue: salary,
            onChange: (e) => { setSalary(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }
        },
        {
            label: "Job Type",
            className: "name",
            htmlFor: "Job Type",
            placeholder: "Job Type",
            type: "text",
            name: "jobtype",
            defaultValue: jobtype,
            onChange: (e) => { setJobtype(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }
        },
        {
            label: "Designation",
            className: "name",
            htmlFor: "Designation",
            placeholder: "Designation",
            type: "text",
            name: "designation",
            defaultValue: designation,
            onChange: (e) => { setDesignation(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }
        }
    ]
    return (
        <div >
            <h1>Register Here</h1>
            <div className="form" >
                {
                    inputElements.map((i, index) => {
                        return (
                            <div key={index} className={i.className} >
                                <label htmlFor={i.htmlFor}>{i.label}</label>
                                <input
                                    placeholder={i.placeholder}
                                    type={i.type}
                                    name={i.name}
                                    noValidate
                                    defaultValue={i.defaultValue}
                                    onChange={i.onChange}
                                    onBlur={i.onBlur}
                                    required
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div >

    )
}

export default EMPD