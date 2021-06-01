import * as React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { Button, Radio, TextField } from "@material-ui/core";
import "./form1.css";

interface MyFormValues {
  firstName: string;
  lastName: string;
  contactNumber: number;
  gender: string;
}

const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
const validation = Yup.object({
  firstName: Yup.string()
    .min(5, "Too Short")
    .max(12, "Must Be 12 Character Or Less")
    .required("Required"),
  lastName: Yup.string()
    .min(3, "Too Short")
    .max(12, "Must Be 8 Character Or Less")
    .required("Required"),
  contactNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required("Required"),
  gender: Yup.string().required("Required"),
});
interface formData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
  paymentOption: string;
  cardHolder: string;
  gender: string;
  cardNumber: number;
  contactNumber: number;
  cvc: number;
}
interface Props {
  handleNext: () => void;
  setFormValue: React.Dispatch<React.SetStateAction<{}>>;
  formValue: formData;
}
const Form1 = (props: Props) => {
  console.log("Form1 Props==>", props);

  const initialValues: MyFormValues = {
    firstName: props.formValue.firstName,
    lastName: props.formValue.lastName,
    contactNumber: props.formValue.contactNumber,
    gender: props.formValue.gender,
  };

  return (
    <div className="formBox">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: MyFormValues, actions) => {
          console.log("Form1 Submit",{ values, actions });
          props.handleNext();
          props.setFormValue({ ...props.formValue, ...values });
        }}
        validationSchema={validation}
      >
        <Form style={{ margin: "0 auto" }}>
          <div>
            <div className="eachField">
              <Field
                name="firstName"
                label="First Name*"
                fullWidth
                as={TextField}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="firstName" />
              </span>
            </div>
            <div className="eachField">
              <Field
                fullWidth
                name="lastName"
                label="Last Name*"
                as={TextField}
              />
            </div>
            <span style={{ color: "red" }}>
              <ErrorMessage name="lastName" />
            </span>
            <div className="eachField">
              <Field
                fullWidth
                name="contactNumber"
                label="Contact Number*"
                placeholder="+923312164007"
                as={TextField}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="contactNumber" />
              </span>
            </div>
            <p>Gender</p>
            <label>
              <Field
                name="gender"
                value="Male"
                label="Male"
                as={Radio}
              />
              Male
            </label>
            <label>
              <Field
                name="gender"
                value="Female "
                label="Female "
                as={Radio}
              />
              Female
            </label>
            <br/>
            <span style={{ color: "red" }}>
              <ErrorMessage name="gender" />
            </span>
          </div>

          <div className="bottomButtons">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className="nextBtn"
            >
              Next
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Form1;