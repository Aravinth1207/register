import React from 'react';
import PD from './PD';
import ED from './ED';
import { FormProvider, useForm } from "react-hook-form";
import { Button, Typography, Alert, AlertTitle } from '@mui/material';
import EMPD from './EMPD';
import UploadResume from './UploadResume';
import { post } from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  const body = {
    name: useSelector(state => state.form.name),
    email: useSelector(state => state.form.email),
    phone: useSelector(state => state.form.phone),
    password: useSelector(state => state.form.password),
    city: useSelector(state => state.form.city),
    pagetwo: {
      school: useSelector(state => state.form2.school),
      highschool: useSelector(state => state.form2.highschool),
      schoolm: useSelector(state => state.form2.schoolm),
      highschoolm: useSelector(state => state.form2.highschoolm),
    },
    pagethree: {
      companyname: useSelector(state => state.form3.companyname),
      salary: useSelector(state => state.form3.salary),
      jobtype: useSelector(state => state.form3.jobtype),
      designation: useSelector(state => state.form3.designation),
    },
  }
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const methods = useForm();
  const [files, setFiles] = React.useState([]);

  const onFileChange = (files) => {
    setFiles(files);
    setShow(false);
    console.log(files)
  }
  const showSet = (value) => {
    setShow2(value);
  }
  const handleUpload = () => {
    const URL1 = "http://localhost:8080/savedetails";

    const config1 = {
      headers: {
        'content-type': 'application/json'
      }
    }
    if (files.length > 0) {
      setShow(false)
      post(URL1, JSON.stringify(body), config1).then(res => {
        if (res.status === 200) {
          setActiveStep(activeStep + 1);
        }
      })
    }
    else {
      setShow(true);
    }
  }



  function getSteps() {
    return ['Personal Details', 'Education Details', 'Employment Details', 'Upload Resume'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PD />;
      case 1:
        return <ED />;
      case 2:
        return <EMPD />;
      case 3:
        return <UploadResume
          onFileChange={(files) => onFileChange(files)}
          showSet={(value) => showSet(value)}
        />;
      default:
        return 'Unknown step';
    }
  }

  const steps = getSteps();
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleUpload();
    }
    else {
      setActiveStep(activeStep + 1);
    }
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }
  return (
    <div>
      {activeStep === steps.length ? (
        <div className="wrapper1" >
          <div className="form-wrapper1">
            <Typography variant="h3" align='center'>
              Thank you for your submission
            </Typography>
          </div>
        </div>
      ) : (
        <div className="wrapper1" >
          <div className="form-wrapper1">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}
                <div className='button'>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="contained"
                    style={{ background: activeStep === 0 ? '#ccc' : '#02a0c7' }}
                  >back</Button>
                  <br />
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ background: '#02a0c7' }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </form>
            </FormProvider>
            <br />
            <Alert severity="error" style={{ display: show ? 'block' : 'none' }}>
              Please upload your resume
            </Alert>
            {show2 && <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <strong>Resume uploaded successfully!</strong>
            </Alert>}
          </div>
        </div >)
      }
    </div >
  )
}

export default App;
