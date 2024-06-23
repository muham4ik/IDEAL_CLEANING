import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import {auth} from "@service"

const index = () => {
  const [form,setForm] = useState({})
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
        const response = await auth.sign_in(form);
        console.log(auth);
        console.log(response);
    }catch(error){
        console.log(error);
    }
}
const handleChange = (e)=>{
const {name , value} = e.target
setForm({...form , [name]:value})
}
  return (
   <>
   <div className="container">
    <h1 className='text-center mt-[200px] font-bold text-[#000] my-5'>LOGIN</h1>
    <form onSubmit={handleSubmit} className='flex flex-col justify-center  m-auto gap-3 w-[500px]'>
    <TextField fullWidth onChange={handleChange} label="email" id="fullWidth" name='email'/>
    <TextField fullWidth onChange={handleChange} label="password" id="fullWidth" name='password'/>
    <a href="">Register</a>
    <Button variant="contained" className='w-full' type='submit' endIcon={<SendIcon/>}>Submit</Button>
    </form>
   </div>
   </>
  )
}

export default index