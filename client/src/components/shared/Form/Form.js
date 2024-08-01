
import React, { useCallback, useEffect, useState } from "react";
import InputType from "./InputType";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { handleLogin, handleRegister } from "../../../services/authService";
import {  defaultTheme } from "../Layout/Default";
import { Avatar } from "@mui/material";






const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [backgroundImage, setBackgroundImage] = useState('');

  const bgHandler= useCallback(()=>{
    if(formType==='login'){
      setBackgroundImage('banner1.jpg')
    }
    else if(formType==='register'){
      setBackgroundImage('banner2.jpg')
    }
  }, [formType]);


useEffect(() => {
  bgHandler();
  
}, [formType,bgHandler]);

const logoStyle = {
  maxWidth: "100%",
  height: "auto",
};
  return (<>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />


        <Grid 
          item
          xs={false}
          sm={4}
          md={7}
          // lg={8}
          // xl={8}
          sx={{
            backgroundImage: `url(/assets/images/${backgroundImage})`, // path to  image file
            // backgroundRepeat: 'no-repeat', 
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} 
        // lg={4} xl={4} 
        component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >


<Avatar sx={{ m: 1, bgcolor: 'primary.main',   }}>
              <img
                            src={`/assets/images/icons/user1.png`}

                            style={logoStyle}
                            alt={`${formTitle} Icon`}

                          />
            </Avatar>
            <Typography component="h1" variant="h5">
            {formTitle}
            </Typography>



            <Box component="form" noValidate  sx={{ mt: 1 }}
              onSubmit={(e) => {
                if (formType === "login"){
                  return handleLogin(e, email, password, role);
                }
                 
                else if (formType === "register"){
                  return handleRegister(
                    e,
                    name,
                    role,
                    email,
                    password,
                    phone,
                    organisationName,
                    address,
                    hospitalName,
                    website
                  );
                }
                 
              }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="role" // Set the name prop directly on the RadioGroup
                  defaultValue="donar" // Make sure to set defaultValue or value on the RadioGroup itself
                  onChange={(e) => setRole(e.target.value)} // Add onChange event handler to capture the selected value
                >
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="donar" control={<Radio />} label="Donar" />
                  <FormControlLabel value="hospital" control={<Radio />} label="Hospital" />
                  <FormControlLabel value="organisation" control={<Radio />} label="Organisation" />
                </RadioGroup>
                </FormControl>

                  {(() => {
                    //eslint-disable-next-line
                    switch (true) {
                      case formType === "login": {
                        return (
                          <>
                            <InputType
                              labelText={"email"}
                              inputType={"email"}
                              name={"email"}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              require={true}
                              Focus={true}
                              placeholder={"abc@domain.com"}
                            />
                            <InputType
                              labelText={"Password"}
                              inputType={"password"}
                              name={"password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              require={true}
                              Focus={false}
                              placeholder={"abc123"}
                            />

                           

                          </>
                        );
                      }
                      case formType === "register": {
                        return (
                          <>
                            {(role === "admin" || role === "donar") && (
                              <InputType
                                labelText={"Name"}
                                inputType={"text"}
                                name={"name"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                require={true}
                                Focus={true}
                                placeholder={"name surname"}
                              />
                            )}
                            {role === "organisation" && (
                              <InputType
                                labelText={"Organisation Name"}
                                inputType={"text"}
                                name={"organisationName"}
                                value={organisationName}
                                onChange={(e) => setOrganisationName(e.target.value)}
                                require={true}
                                Focus={true}
                                placeholder={"organisation name"}
                              />
                            )}
                            {role === "hospital" && (
                              <InputType
                                labelText={"Hospital Name"}
                                labelFor={"forHospitalName"}
                                inputType={"text"}
                                name={"hospitalName"}
                                value={hospitalName}
                                onChange={(e) => setHospitalName(e.target.value)}
                                require={true}
                                Focus={true}
                                placeholder={"hospital name"}
                              />
                            )}

                            <InputType
                              labelText={"email"}
                              inputType={"email"}
                              name={"email"}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              require={true}
                              Focus={false}
                              placeholder={"abc@domain.com"}
                            />
                            <InputType
                              labelText={"Password"}
                              inputType={"password"}
                              name={"password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              require={true}
                              Focus={false}
                              placeholder={"abc123"}
                            />
                            <InputType
                              labelText={"website"}
                              inputType={"text"}
                              name={"website"}
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              require={false}
                              Focus={false}
                              placeholder={"abc@domain.com"}
                            />
                            <InputType
                              labelText={"Address"}
                              inputType={"text"}
                              name={"address"}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              require={true}
                              Focus={false}
                              placeholder={"Address"}
                            />
                            <InputType
                              labelText={"Phone"}
                              labelFor={"forPhone"}
                              inputType={"text"}
                              name={"phone"}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              require={true}
                              Focus={false}
                              placeholder={"315475635675"}
                            />
                          </>
                        );
                      }
                    }
                  })()}
                   {formType === "login" ? (<>
 <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {submitBtn}
              </Button>
             
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Not registerd yet ? Register"}
                  </Link>
                </Grid>
              </Grid>
              </>
            ) : (<>
<Grid container alignItems={"center"} gap={'25px'}>
                <Grid item xs >
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {submitBtn}
            </Button>
                </Grid>
                <Grid item>
                <Link href="/" variant="body2">
                {"Already have an ID ? Login !"}
              </Link>
                </Grid>
              </Grid>



           
             
              </>
            )} 

                </Box>
              
</Box>
             


        </Grid>
      </Grid>
    </ThemeProvider>
  </>

  );
};

export default Form;

