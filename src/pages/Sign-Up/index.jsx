import React from 'react';
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { BasicModal } from '../../components/modal';
import { auth } from "@service";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Index = () => {
    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(false);
    };

    const initialValues = {
        email: '',
        full_name: '',
        password: '',
        phone_number: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
        full_name: Yup.string()
            .min(2, 'Name is too short')
            .max(50, 'Name is too long')
            .required('Name is required'),
        password: Yup.string()
            .min(6, 'Password is too short')
            .required('Password is required'),
        phone_number: Yup.string()
            .min(3, 'Phone_number is too short')
            .required('Phone number is required')
            .max(15, 'Name is too long')
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await auth.sign_up(values);
            if (response.status === 200) {
                setOpen(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <BasicModal open={open} handleClose={toggleModal} />
            <h1 className='text-center mt-[200px] font-bold text-[#000] my-5'>Register</h1>
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
                            type='email'
                            name='email'
                            label="Email"
                            helperText={<ErrorMessage name="email" component="div" />}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            type='text'
                            name='full_name'
                            label="Full Name"
                            helperText={<ErrorMessage name="full_name" component="div" />}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            type='password'
                            name='password'
                            label="Password"
                            helperText={<ErrorMessage name="password" component="div" />}
                        />
                        <Field
                            as={TextField}
                            fullWidth
                            type='tel'
                            name='phone_number'
                            label="Phone"
                            helperText={<ErrorMessage name="phone_number" component="div" />}
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            className='w-full'
                            endIcon={<SendIcon />}
                            disabled={isSubmitting}
                        >
                            Sign Up
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Index;