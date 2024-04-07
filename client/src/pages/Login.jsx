import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from "react-query";
import { Formik } from "formik";
import * as yup from "yup";
import * as apiClient from "../apiClient.js";
import { useTheme } from '@emotion/react';
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValueLogin = {
    email: "",
    password: ""
};

const Login = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const nonMobileScreen = useMediaQuery("(min-width:600px)");

    const mutation = useMutation(apiClient.login, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            navigate("/home");
            alert("Signed in successfully");
        },
        onError: (error) => {
            console.error('Error:', error);
        }
    });

    const handleFormSubmit = async (values) => {
        console.log("Handle submit");
        mutation.mutate(values);
    };

    return (
        <Box mx="auto" maxWidth="60%" gap="5rem" display="flex" flexDirection="column" justifyContent="center" >
            <Typography variant='h2' color={palette.primary.main} textAlign="center">
                Login
            </Typography>

            <Formik
                onSubmit={(values) => {
                    console.log("Form submitted with values:", values);
                    handleFormSubmit(values);
                }}
                initialValues={initialValueLogin}
                validationSchema={loginSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit} >
                        <Box
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            gap="40px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        >
                            <TextField
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={Boolean(touched.email) && errors.email}
                                helperText={touched.email && errors.email}
                                sx={{
                                    gridColumn: "span 4",
                                    backgroundColor: "#ffffff"
                                }}
                            />

                            <TextField
                                label="Password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={Boolean(touched.password) && errors.password}
                                helperText={touched.password && errors.password}
                                sx={{
                                    gridColumn: "span 4",
                                    backgroundColor: "#ffffff"
                                }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}
                            >
                                Login
                            </Button>

                            <Typography
                                onClick={() => {
                                    navigate("/register");
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light
                                    }
                                }}
                            >
                                Don't have an Account? Sign Up Here
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Login;
