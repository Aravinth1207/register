import { createSlice } from '@reduxjs/toolkit';


const Form = createSlice({
    name: "form",
    initialState: {
        name: "",
        email: "",
        phone: "",
        city: "",
        password: "",
    },
    reducers: {
        updateVal(state, actions) {
            state.name = actions.payload.name;
            state.email = actions.payload.email;
            state.phone = actions.payload.phone;
            state.password = actions.payload.password;
            state.city = actions.payload.city;
        },

    },
});

export const { updateVal } = Form.actions;

export default Form.reducer;