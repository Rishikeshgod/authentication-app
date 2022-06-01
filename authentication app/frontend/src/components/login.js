import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Box, Button, TextField } from '@mui/material';


const Login = () => {
    const history = useNavigate();
    const [inputs,setInputs] = useState({
        email:"",
        password:"",
    })
    const handleChange=(e)=>{
        setInputs((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))
    }
    const sendRequest = async()=>{
        const res  = await axios.post('http://localhost:5000/api/login',{
            
            email:inputs.email,
            password:inputs.password
        })
        .catch((err)=>console.log(err));
        const data = await res.data;
        return data;
    }
    const handlesubmit= (e)=>{
        e.preventDefault();
        //send http request
        sendRequest().then(()=>history("/user"));

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
                                name="email"
                onChange={handleChange}
                variant="outlined" placeholder='Email' margin='normal'/>
                <TextField 
                                name="password"
                onChange={handleChange}
                variant="outlined" placeholder='Password' margin='normal'/>
                <Button variant="contained" type = "submit">Login</Button>
            </Box>
        </form>
    </div>
  );
};

export default Login