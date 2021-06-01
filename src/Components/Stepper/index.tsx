import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepConnector from "@material-ui/core/StepConnector";
import StepLabel from "@material-ui/core/StepLabel";
import { StepIconProps } from "@material-ui/core/StepIcon";
import PersonIcon from "@material-ui/icons/Person";
import HttpsIcon from "@material-ui/icons/Https";
import PaymentIcon from "@material-ui/icons/Payment";
import DoneIcon from "@material-ui/icons/Done";
import Form1 from "../Form1";
import Form2 from "../Form2";
import Form3 from "../Form3";
import ReviewForm from "../ReviewForm";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundColor: "#4eb7f8 ",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#4eb7f8 ",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#4eb7f8 ",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: "#4eb7f8 ",
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <PersonIcon />,
    2: <HttpsIcon />,
    3: <PaymentIcon />,
    4: <DoneIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Personal", "Account", "Payment", "Finish"];
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
export default function CustomizedSteppers() {
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState<any>({});
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(
    step: number,
    setFormValues: React.Dispatch<React.SetStateAction<{}>>,
    formValue: formData
  ) {
    switch (step) {
      case 0:
        return (
          <Form1
            handleNext={handleNext}
            setFormValue={setFormValues}
            formValue={formValues}
          />
        );
      case 1:
        return (
          <Form2
            handleNext={handleNext}
            handleBack={handleBack}
            setFormValue={setFormValues}
            formValue={formValues}
          />
        );
      case 2:
        return (
          <Form3
            handleNext={handleNext}
            handleBack={handleBack}
            setFormValue={setFormValues}
            formValue={formValues}
          />
        );
      case 3:
        return (
          <ReviewForm
            formValue={formValues}
            handleBack={handleBack}
            handleReset={handleReset}
            setFormValue={setFormValues}
          />
        );
      default:
        return "Unknown step";
    }
  }
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        style={{ backgroundColor: "#fff" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {getStepContent(activeStep, setFormValues, formValues)}
        {/* {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
        )} */}
      </div>
    </div>
  );
}