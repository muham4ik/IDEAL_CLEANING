import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { auth } from "@service";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {Modal} from "../../components/modal"
import * as Yup from 'yup';
import { EditNote } from '@mui/icons-material';

const Index = () => {
  const [open,setOpen] = useState(false)
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        // Handle successful login, e.g., redirect or show a success message
        console.log('Login successful');
        navigate("/main")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
    console.log(values);
  };
  const toggle = ()=>{
    setOpen(false)
  }
  const handleClick = () => {
    setOpen(true)
  };
  const handleNavigate = ()=>{
    navigate("/sign-up")
  }

  
  return (
    <div className="container">
     <Modal open={open} toggle={toggle}/> 
      <h1 className='text-center font-bold text-[32px] mt-[180px] py-5 text-[#000] '>LOGIN</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col justify-center m-auto gap-3 w-[500px]'>
            <Field
              as={TextField}
              fullWidth
              type='text'
              name='email'
              label="Email"
              helperText={<ErrorMessage name="email" component="div" />}
            />
            <Field
              as={TextField}
              fullWidth
              type='text'
              name='password'
              label="Password"
              helperText={<ErrorMessage name="password" component="div" />}
            />
            <button 
              className=' mt-2 bg-transparent  text-[blue] border-none hover:text-black text-start w-[134px]  cursor-pointer '
              onClick={handleClick}>Forgot password
              </button>
              <div className="flex justify-between gap-4">  <Button
              variant="contained"
              type='submit'
              className='w-full tex]'
              endIcon={<SendIcon />}
              disabled={isSubmitting}
               
              >
              Login
            </Button>
            <Button
              variant="outlined"
              type='button'
              className='w-full ]'
              endIcon={<EditNote />}
              disabled={isSubmitting}
              onClick={handleNavigate}
            >
              Create Account
            </Button>
            </div>
          
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Index;





