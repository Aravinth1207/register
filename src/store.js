import { configureStore } from '@reduxjs/toolkit';
import FormReducer from './formSlice';
import FormReducer2 from './formSlice2';
import FormReducer3 from './formSlice3';





export default configureStore({
  reducer: {
    form: FormReducer,
    form2: FormReducer2,
    form3: FormReducer3,
  },

});

