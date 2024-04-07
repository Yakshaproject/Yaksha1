import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from "react-query";
import { Formik } from "formik";
import * as yup from "yup";
import * as apiClient from "../apiClient.js";
import { useTheme } from '@emotion/react';
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';

const registerSchema = yup.object().shape({
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValueRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
};

const Register = () => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const nonMobileScreen = useMediaQuery("(min-width:600px)");

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
            alert("Registered successfully");
        },
        onError: (error) => {
            console.error('Error:', error);
        }
    });

    const handleFormSubmit = async (values) => {
        mutation.mutate(values);
    };

    return (
        <Box mx="auto" maxWidth="60%" gap="5rem" display="flex" flexDirection="column" justifyContent="center" >
            <Typography variant='h2' color={palette.primary.main} textAlign="center">
                Register
            </Typography>
            <Formik
                onSubmit={(values) => handleFormSubmit(values)}
                initialValues={initialValueRegister}
                validationSchema={registerSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    resetForm
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
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstname}
                                name="firstname"
                                error={Boolean(touched.firstname) && errors.firstname}
                                helperText={touched.firstname && errors.firstname}
                                sx={{
                                    gridColumn: "span 4",
                                    backgroundColor: "#ffffff"
                                }}
                            />
                            <TextField
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastname}
                                name="lastname"
                                error={Boolean(touched.lastname) && errors.lastname}
                                helperText={touched.lastname && errors.lastname}
                                sx={{
                                    gridColumn: "span 4",
                                    backgroundColor: "#ffffff"
                                }}
                            />
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
                                Register
                            </Button>
                            <Typography
                                onClick={() => {
                                    navigate("/login");
                                    resetForm();
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
                                Already have an Account? Login Here
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Register;
