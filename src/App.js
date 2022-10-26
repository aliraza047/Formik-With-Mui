import React, { useState } from 'react';
import Header from './Components/Header';
import { Button, Select, Upload } from 'antd';
import { Formik, Form, Field } from 'formik';
import { UploadOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { Input } from "./Components/forms/Input"
import { OneSelected } from "./Components/forms/Select"
import { TextError } from './Components/ErrorShow/TextError';
import { RadioInput } from './Components/forms/Radio';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  is_read: false,
  radio: "",
  multiple: [],
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  arrivealDate: '',
  departureDate: '',
  message: '',
  termsOfService: false
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  is_read: Yup.bool().required("Required"),
  email: Yup.string()
    .email('Invalid email.')
    .required('Required'),
  phone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  addressLine1: Yup.string()
    .required('Required'),
  addressLine2: Yup.string(),
  radio: Yup.string()
    .required('Required'),
  state: Yup.string()
    .required('Required'),
  country: Yup.string()
    .required('Required'),
  arrivealDate: Yup.date()
    .required('Required'),
  departureDate: Yup.date()
    .required('Required'),
  message: Yup.string(),
  termsOfService: Yup.boolean()
    .oneOf([true], 'The terms and conditions must be accepted.')
    .required('The terms and conditions must be accepted.'),
});

const App = () => {
  const classes = useStyles();
  const { Option } = Select;
  const [size, setSize] = useState('middle');

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>

            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ values, setFieldValue, handleSubmit, errors, touched }) => (
                <Form>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                  <pre>{JSON.stringify(errors, null, 2)}</pre>
                  <pre>{JSON.stringify(touched, null, 2)}</pre>
                  <Field
                    name="firstName"
                    component={Input}
                    autoFocus={false}

                    // onBlur={(e) => {
                    //   validateForm();
                    //   if (e.target.value.length >= 2 && values.userEnteredSku === "" && values.skuCheckBox) {
                    //     dispatch(productActions.fetchSKU({ nameString: e.target.value, catString: values.catSuggestedSku }));
                    //   }
                    // }}
                    customFeedbackLabel=" "
                    placeholder={"Name"}
                    label="Name*"
                  />

                  <Field
                    name="is_read"
                    component={Input}
                    autoFocus={false}
                    type="checkbox"
                    // onBlur={(e) => {
                    //   validateForm();
                    //   if (e.target.value.length >= 2 && values.userEnteredSku === "" && values.skuCheckBox) {
                    //     dispatch(productActions.fetchSKU({ nameString: e.target.value, catString: values.catSuggestedSku }));
                    //   }
                    // }}
                    customFeedbackLabel=" "
                    placeholder={"Name"}
                    label="Is Read*"
                  />

                  <Field
                    name="country"
                    component={OneSelected}
                   
                    options={["At customer location", "At my location", "Both"]}
                    customFeedbackLabel=" "
                    placeholder={"Name"}
                    label="Select*"
                  />

<Field
                    name="radio"
                    component={RadioInput}
                    size={size}
                    options={[{name: "Large", value: "large"}, {name: "Small", value: "small"}]}
                    customFeedbackLabel=" "
                    placeholder={"Name"}
                    label="Radio*"
                  />
      <Select
        mode="multiple"
        size={size}
        placeholder="Please select"
        onChange={(value)=>{
          setFieldValue("multiple", value)
        }}
        style={{
          width: '100%',
        }}
      >
        <Option value="one">One</Option>
        <Option value="three">Three</Option>
        <Option value="tow">Tow</Option>
      </Select>


      <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      // defaultFileList={[...fileList]}
      className="upload-list-inline"
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>

      <button onClick={handleSubmit}>submit</button>
                  {/* <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <Typography>
                      Your details
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="firstName"
                      label="First Name"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="lastName"
                      label="Last Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="email"
                      label="Email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="phone"
                      label="Phone"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      Address
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="addressLine1"
                      label="Address Line 1"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="addressLine2"
                      label="Address Line 2"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="city"
                      label="City"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Textfield
                      name="state"
                      label="State"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Select
                      name="country"
                      label="Country"
                      options={countries}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography>
                      Booking information
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <DateTimePicker
                      name="arrivealDate"
                      label="Arrival Date"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <DateTimePicker
                      name="departureDate"
                      label="Departure Date"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textfield
                      name="message"
                      label="Message"
                      multiline={true}
                      rows={4}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Checkbox
                      name="termsOfService"
                      legend="Terms Of Service"
                      label="I agree"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button>
                      Submit Form
                    </Button>
                  </Grid>

                </Grid> */}

                </Form>

              )}
            </Formik>

          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default App;
