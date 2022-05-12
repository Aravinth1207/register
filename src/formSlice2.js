import { createSlice } from '@reduxjs/toolkit';


const Form2 = createSlice({
    name: "form2",
    initialState: {
        school: "",
        highschool: "",
        schoolm: "",
        highschoolm: ""
    },
    reducers: {
        updateVal1(state, actions) {
            state.school = actions.payload.school;
            state.highschool = actions.payload.highschool;
            state.schoolm = actions.payload.schoolm;
            state.highschoolm = actions.payload.highschoolm;
        }
    }
});

export const { updateVal1 } = Form2.actions;

export default Form2.reducer;