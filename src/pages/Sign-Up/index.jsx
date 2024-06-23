import React from 'react'
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { BasicModal } from '../../components/modal';
import {auth} from "@service"

const index = () => {
    const [open,setOPen] =useState(false)  
    const [form,setForm] = useState({})
    const toogle = ()=>{
        setOPen(false)
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const response = await auth.sign_up(form);
            console.log(auth);
            if(response.status === 200){
                setOPen(true)
            }
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
    <BasicModal open={open} handleClose={toogle}/>
    <h1 className='text-center mt-[200px] font-bold text-[#000] my-5'>Register</h1>
    <form onSubmit={handleSubmit} className='flex flex-col justify-center  m-auto gap-3 w-[500px]'>
    <TextField fullWidth type='email' onChange={handleChange} label="email" name='email'/>
    <TextField fullWidth type='text' onChange={handleChange} label="full_name" name='full_name' />
    <TextField fullWidth type='password' onChange={handleChange} label="password" name='password' />
    <TextField fullWidth type='tel' onChange={handleChange} label="phone" name='phone_number' />
    <Button variant="contained" type='submit' className='w-full' endIcon={<SendIcon/>}>Sign Up</Button>
    </form>
   </div>
   </>
  )
}

export default index