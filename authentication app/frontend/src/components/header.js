import React,{useState} from 'react'
import { AppBar, Toolbar, Typography,Box, Tabs, Tab } from "@mui/material"
import {Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
    const isLoggedIn = useSelector(state=>state.isLoggedIn)
    const [value, setvalue] = useState();
  return (
    <div>
        <AppBar position ="sticky">
            <Toolbar>
                <Typography variant="h3">MernAuth</Typography>
                <Box sx={{marginLeft:"auto"}}>
                    <Tabs indicatorColor="secondary" 
                    onChange={(e,val)=>setvalue(val)} value={value} textcolor="inherit">
                        <Tab to ="/login" LinkComponent={Link} label = "Login"/>
                        <Tab to ="/signup" LinkComponent={Link} label = "signup"/>
{isLoggedIn              &&<Tab to ="/" LinkComponent={Link} label = "Logout"/>}                        

                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header