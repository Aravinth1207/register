import React, { useState } from 'react'
import { updateVal1 } from './formSlice2';
import { useDispatch, useSelector } from 'react-redux';

const ED = () => {
    const [school, setSchool] = useState(useSelector(state => state.form2.school));
    const [highschool, setHighSchool] = useState(useSelector(state => state.form2.highschool));
    const [schoolm, setSchoolm] = useState(useSelector(state => state.form2.schoolm));
    const [highschoolm, setHighSchoolm] = useState(useSelector(state => state.form2.highschoolm));


    const dispatch = useDispatch();
    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateVal1({ school, highschool, schoolm, highschoolm }));
    }

    const inputElements = [
        {
            label: "School",
            className: "school",
            htmlFor: "School",
            placeholder: "School",
            type: "text",
            name: "school",
            defaultValue: school,
            onChange: (e) => { setSchool(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }
        },
        {
            label: "High School",
            className: "highschool",
            htmlFor: "High School",
            placeholder: "Enter Your High School Name",
            type: "text",
            name: "highSchool",
            defaultValue: highschool,
            onChange: (e) => { setHighSchool(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }
        },
        {
            label: "SSLC Marks",
            className: "school",
            htmlFor: "School",
            placeholder: "Enter SSLC Mark",
            type: "number",
            name: "schoolM",
            defaultValue: schoolm,
            onChange: (e) => { setSchoolm(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }
        },
        {
            label: "HSC Marks",
            className: "highschool",
            htmlFor: "High School",
            placeholder: "Enter HSC Mark",
            type: "number",
            name: "highSchoolM",
            defaultValue: highschoolm,
            onChange: (e) => { setHighSchoolm(e.target.value) },
            onBlur: (e) => { handleUpdate(e) }
        },
    ]

    return (

        <div >
            <h1>Register Here</h1>
            <div className='form' >
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

export default ED