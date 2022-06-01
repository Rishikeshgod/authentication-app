import { Button, inputClasses, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const history = useNavigate();
    const [input,setInputs] = useState({
        name:"",
        email:"",
        password:"",
    });
    const handleChange=(e)=>{
        setInputs((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }
    const sendRequest = async()=>{
        const res  = await axios.post('http://localhost:5000/api/signup',{
            name:input.name,
            email:input.email,
            password:input.password
        })
        .catch((err)=>console.log(err));
        const data = await res.data;
        return data;
    }
    const handlesubmit= (e)=>{
        e.preventDefault();
        //send http request
        sendRequest().then(()=>history("/login"));

    }
  return (
    <div>
        <form onSubmit={handlesubmit}>
            <Box marginLeft="auto"
            marginRight="auto"
            width={300}
            display="flex" 
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center">
                <TextField 
                name="name"
                onChange={handleChange}
                variant="outlined" placeholder='Name' margin='normal'/>
                <TextField 
                                name="email"
                onChange={handleChange}
                variant="outlined" placeholder='Email' margin='normal'/>
                <TextField 
                                name="password"
                onChange={handleChange}
                variant="outlined" placeholder='Password' margin='normal'/>
                <Button variant="contained" type = "submit">Signup</Button>
            </Box>
        </form>
    </div>
  )
}

export default Signup