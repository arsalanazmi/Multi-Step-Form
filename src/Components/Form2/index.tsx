import * as React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";
import {
  Button,
  TextField,
  Input,
  InputAdornment
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./form2.css";
import * as Yup from "yup";

interface MyFormValues {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}
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
  handleBack: () => void;
  formValue: formData;
  setFormValue: React.Dispatch<React.SetStateAction<{}>>;
}
const lowercaseRegex = /(?=.*[a-z])/;

const uppercaseRegex = /(?=.*[A-Z])/;

const numericRegex = /(?=.*[0-9])/;

const validation = Yup.object({
  email: Yup.string().email().required("Email Required"),
  userName: Yup.string().max(12, "Too Long").required("UserName Required"),
  password: Yup.string()
    .matches(lowercaseRegex, "one lowercase required!")
    .matches(uppercaseRegex, "one uppercase required!")
    .matches(numericRegex, "one number required!")
    .min(8, "Minimum 8 characters required!")
    .max(20, "Password is Too Long")
    .required("Password is require"),
  confirmPassword: Yup.string().when("password", {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("password")], "Password doesn't match"),
  }),
});
const Form2 = (props: Props) => {
  const [isVisible, setIsVisble] = React.useState(false);
  const [isVisibleConfirmPassword, setIsVisbleConfirmPassword] = React.useState(
    false
  );

  const toggleVisible = () => {
    setIsVisble(!isVisible);
  };
  console.log("Form2 Props", props.formValue);

  const toggleVisibleComfirmPassword = () => {
    setIsVisbleConfirmPassword(!isVisibleConfirmPassword);
  };

  const initialValues: MyFormValues = {
    email: props.formValue.email,
    userName: props.formValue.userName,
    password: props.formValue.password,
    confirmPassword: props.formValue.confirmPassword,
  };
  return (
    <div className="formBox">
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log("Form2 Submit",{ values, actions });
          actions.setSubmitting(false);
          props.setFormValue({ ...props.formValue, ...values });
          props.handleNext();
        }}
        validationSchema={validation}
      >
        <Form style={{ margin: "0 auto" }}>
          <div>
            <div className="eachField">
              <Field
                name="email"
                label="Email ID*"
                fullWidth
                as={TextField}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="email" />
              </span>
            </div>
            <div className="eachField">
              <Field
                fullWidth
                name="userName"
                label="User Name*"
                as={TextField}
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="userName" />
              </span>
            </div>

            <div className="eachField">
              <Field
                type={isVisible ? "text" : "password"}
                as={Input}
                variant="outlined"
                name="password"
                label="password*"
                placeholder="Password"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={toggleVisible}>
                      {isVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <span style={{ color: "red" }}>
                <ErrorMessage name="password" />
              </span>
            </div>
            <div className="eachField">
              <Field
                fullWidth
                name="confirmPassword"
                label="Confirm Password*"
                placeholder="Confirm Password"
                type={isVisibleConfirmPassword ? "text" : "password"}
                as={Input}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={toggleVisibleComfirmPassword}>
                      {isVisibleConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <span className="error" style={{ color: "red" }}>
                <ErrorMessage name="confirmPassword" />
              </span>
            </div>
          </div>

          <div className="bottomButtons">
            <Button
              variant="contained"
              color="secondary"
              onClick={props.handleBack}
            >
              Previous
            </Button>
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

export default Form2;