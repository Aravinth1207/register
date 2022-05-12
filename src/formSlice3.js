import { createSlice } from '@reduxjs/toolkit';


const Form3 = createSlice({
    name: "form3",
    initialState: {
        companyname: "",
        salary: "",
        designation: "",
        jobtype: ""
    },
    reducers: {
        updateVal2(state, actions) {
            state.companyname = actions.payload.companyname;
            state.salary = actions.payload.salary;
            state.designation = actions.payload.designation;
            state.jobtype = actions.payload.jobtype;
        },

    },
});

export const { updateVal2 } = Form3.actions;

export default Form3.reducer;