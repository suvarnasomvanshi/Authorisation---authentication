import { TextField, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {

 const navigate = useNavigate();


  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e)=>{
   setInputs(prev=>({
      ...prev,
      [e.target.name] : e.target.value,
   }))
  };



const sendRequest = async ()=>{

  const res = await axios.post("http://localhost:5000/api/signup",{
    name :inputs.name,
    email :inputs.email,
    password : inputs.password

  })
  .catch(err=>console.log(err))

  const data = await res.data;
  console.log(data)
  return data;

}




  const handleSubmit = (e) => {
   e.preventDefault();
   //send http request
   sendRequest()
   .then(()=>navigate("/login"));

  //console.log(inputs)
  };




  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="centre"
          width={300}
          marginLeft="auto"
          marginRight="auto"
        >
          <Typography variant="h3">Signup</Typography>

          <TextField
            margin="normal"
            variant="outlined"
            
            placeholder="name"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            variant="outlined"

            placeholder="email"
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            variant="outlined"

            placeholder="password"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleChange}
          />

          <Button variant="contained" type="submit">

            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
