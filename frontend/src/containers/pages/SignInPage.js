import React from 'react'
import {useRef} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useNavigate } from "react-router-dom";

import { useAccount } from "../hooks/useAccount";


const SigninPage=()=>{
    const {username, usernameMessage, password, passwordMessage,
        setMe, resetSignInData, checkUsername, checkPassword} = useAccount();
    const paperStyle={padding :20,height:'70vh',width:360, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const usernamePointer = useRef(null);
    const passwordPointer = useRef(null);

    const navigate = useNavigate();
    
    const onKeyPress = (field) => (event) => {
        if (event.key === 'Enter') {
            if (field === 'username') {
                passwordPointer.current.focus();
            }
            else if (field === 'password') {
                handleSubmit(event);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!usernameMessage && !passwordMessage && username && password) {
            alert("Sign in successfully")
            navigate("/account")
            setMe(username)
            resetSignInData()
        }
        else {
            alert("Sign in failed")
            usernamePointer.current.focus()
        }  
    };

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <br />
                    <h2>Sign In</h2>
                    <br />
                </Grid>
                <TextField inputRef={usernamePointer} label='Username' placeholder='Enter username' variant="outlined" value={username}
                        error={usernameMessage !== '' } helperText={usernameMessage} onChange={checkUsername} fullWidth required
                        onKeyPress={onKeyPress('username')}/>
                <TextField inputRef={passwordPointer} label='Password' placeholder='Enter password' type='password' variant="outlined" value={password}
                        error={passwordMessage !== '' } helperText={passwordMessage} onChange={checkPassword} fullWidth required
                        onKeyPress={onKeyPress('password')}/>
                {/* view password: https://stackoverflow.com/questions/60391113/how-to-view-password-from-material-ui-textfield */}
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={handleSubmit} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="../SignUp" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default SigninPage



