import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const labelStyle = { mt: 1, mb: 1, fontWeight: 'bold', color: 'white' };

const AuthForm = ({ onSubmit, isAdmin }) => {
    const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
    const [isSignup, setIsSignup] = useState(!isAdmin);

    useEffect(() => {
        setIsSignup(!isAdmin);
    }, [isAdmin]);

    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ inputs, signup: isSignup });
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'url(https://pimwp.s3-accelerate.amazonaws.com/2022/07/Movie-1200-630.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    width: 400,
                    padding: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: 'center',
                    backdropFilter: 'blur(-1000px)'
                }}
            >
                <Typography variant="h4" fontWeight="bold" color="white" 
                gutterBottom>
                    {isSignup ? "Create Account" : "Welcome Back"}
                </Typography>
                <Typography variant="subtitle1" color="white" gutterBottom>
                    {isSignup ? "Join us to explore more features" : "Sign in to continue"}
                </Typography>
                <form onSubmit={handleSubmit}>
                    {isSignup && !isAdmin && (
                        <>
                            <FormLabel sx={labelStyle}>Full Name</FormLabel>
                            <TextField value={inputs.name} onChange={handleChange} variant="outlined" type="text" name="name" fullWidth InputProps={{ style: { color: 'black' } }} />
                        </>
                    )}
                    <FormLabel sx={labelStyle}>Email Address</FormLabel>
                    <TextField value={inputs.email} onChange={handleChange} variant="outlined" type="email" name="email" fullWidth InputProps={{ style: { color: 'black' } }} />
                    <FormLabel sx={labelStyle}>Password</FormLabel>
                    <TextField value={inputs.password} onChange={handleChange} variant="outlined" type="password" name="password" fullWidth InputProps={{ style: { color: 'black' } }} />
                    <Button
                        sx={{ mt: 3, borderRadius: 2, bgcolor: '#2b2d42', color: 'white', fontWeight: 'bold', '&:hover': { bgcolor: '#1a1c29' } }}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </Button>
                    {!isAdmin && (
                        <Button onClick={() => setIsSignup(!isSignup)} sx={{ mt: 2, color: 'white', fontWeight: 'bold' }} fullWidth>
                            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                        </Button>
                    )}
                </form>
            </Box>
        </Box>
    );
};

export default AuthForm;
