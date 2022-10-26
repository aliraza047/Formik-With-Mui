import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
    //   Stack,
    TextField,
    IconButton,
    InputAdornment,
    Grid, Button
} from "@material-ui/core";
// import { LoadingButton } from "@material-ui/lab";
// import eyeFill from "@iconify/icons-eva/eye-fill";
// import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { Form, FormikProvider, useFormik } from "formik";
import BasicSelect from "./Components/BasicSelect";
import ImageUpload from "./Components/ImageUpload";
import countries from './data/countries.json';
import SelectWrapper from "./Components/FormsUI/Select";

// ----------------------------------------------------------------------

const SERVICE_LOCATION = ["At customer location", "At my location", "Both"]
export default function ProviderForm() {
    const [showPassword, setShowPassword] = useState('');
    //   const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const ProviderSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("First name required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Last name required"),
        email: Yup.string()
            .email("Email must be a valid email address")
            .required("Email is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        country: Yup.string().required("country is required"),
        dob: Yup.mixed().required('date of birth is required'),
        postalCode: Yup.string().required("Postal Code is required"),
        serviceLocation: Yup.string().required("Service Location is required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phoneNumber: "",
            country: "",
            avatar: "",
            postalCode: "",
            bio: "",
            avatarChanged: false,
            category: "",
            serviceLocation: ""
        },
        validationSchema: ProviderSchema,
        onSubmit: async (values) => {
            console.log('values', values)
        }
    });

    const { errors, touched, handleSubmit, getFieldProps, values } = formik;
    console.log('ss', touched.serviceLocation, errors.serviceLocation)
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate>
                <Grid container>
                    <Grid item md={12} >
                        <Grid container spacing={1} >
                            <Grid item md={1}></Grid>
                            <Grid item md={5} >
                                <TextField
                                    fullWidth
                                    placeholder="David"
                                    label="First name*"
                                    {...getFieldProps("firstName")}
                                    error={Boolean(touched.firstName && errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                />
                                <TextField
                                    fullWidth
                                    label="Last name *"
                                    placeholder="Johnson"
                                    {...getFieldProps("lastName")}
                                    error={Boolean(touched.lastName && errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                />
                                <TextField
                                    fullWidth
                                    placeholder=""
                                    autoComplete="username"
                                    label="Postal Code*"
                                    {...getFieldProps("postalCode")}
                                    error={Boolean(touched.postalCode && errors.postalCode)}
                                    helperText={touched.postalCode && errors.postalCode}
                                />
                                <TextField
                                    fullWidth
                                    placeholder=""
                                    autoComplete="username"
                                    label="Address 1*"
                                    {...getFieldProps("address")}
                                    error={Boolean(touched.address && errors.address)}
                                    helperText={touched.address && errors.address}
                                />
                                <TextField
                                    fullWidth
                                    placeholder=""
                                    autoComplete="username"
                                    label="Address 2"
                                    {...getFieldProps("address2")}
                                    error={Boolean(touched.address2 && errors.address2)}
                                    helperText={touched.address2 && errors.address2}
                                />
                                <SelectWrapper
                                    name="country"
                                    label="Country"
                                    options={countries}
                                />


                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    loading={false}
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button> 
                            </Grid>

                            <Grid item md={5}>
                                <TextField
                                    fullWidth
                                    placeholder=""
                                    autoComplete="username"
                                    type="email"
                                    label="Email address*"
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                                <TextField
                                    fullWidth
                                    placeholder=""
                                    autoComplete="username"
                                    type="number"
                                    label="Phone Number*"
                                    {...getFieldProps("phoneNumber")}
                                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                    helperText={touched.phoneNumber && errors.phoneNumber}
                                />
                                <TextField
                                    fullWidth
                                    placeholder=""
                                    autoComplete="username"
                                    label="City *"
                                    {...getFieldProps("city")}
                                    error={Boolean(touched.city && errors.city)}
                                    helperText={touched.city && errors.city}
                                />

                                <TextField
                                    label="Bio"
                                    multiline
                                    maxRows={4}
                                    aria-label="maximum height"
                                    placeholder="Bio"
                                    {...getFieldProps("bio")}
                                />

                                <TextField
                                    fullWidth
                                    autoComplete="current-password"
                                    type={showPassword ? "text" : "password"}
                                    label="Change Password"
                                    {...getFieldProps("password")}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => setShowPassword((prev) => !prev)}
                                                >
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    error={Boolean(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                />
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    onClick={() => console.log('k')}
                                >
                                    Cancel
                                </Button>
                            </Grid>

                            <Grid item md={1}></Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </Form>
        </FormikProvider>
    );
}
