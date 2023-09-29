import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Tabs ,Tab} from "@mui/material";
import { Link } from "react-router-dom";



const Header = () => {

    const [value,setValue] =useState();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>

           <Typography varient="h3"> mern auth </Typography>

           <Box sx={{ marginLeft: "auto" }}>

            <Tabs 
            value ={value}
            onChange={(e,value)=>setValue(value)}
            textColor="inherit"
            indicatorColor="secondary"
            >

               <Tab  to="/login"  LinkComponent={Link} label="login"/>
               <Tab  to="/signup" LinkComponent={Link} label="signup"/>
               <Tab  to="/user"   LinkComponent={Link} label="user"/>

            </Tabs>

          </Box>


        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
