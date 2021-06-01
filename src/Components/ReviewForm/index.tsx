import { Button } from "@material-ui/core";
import "./reviewform.css";
import Swal from "sweetalert2";

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

const ReviewForm = ({
  formValue,
  handleReset,
  handleBack,
  setFormValue,
}: {
  formValue: formData;
  handleReset: () => void;
  setFormValue: React.Dispatch<React.SetStateAction<{}>>;
  handleBack: () => void;
}) => {
  const finish = () => {
    Swal.fire("Sign Up Successfully", "Form Submitted", "success");
    handleReset();
    setFormValue({});
  };
  return (
    <div style={{ padding: "0px 10px" }}>
      <h3 className="reviewHeading  ">Review Details</h3>
      <hr />
      <p className="fieldList">
        {" "}
        <span className="fieldName">FullName</span>: {formValue.firstName}
        {formValue.lastName}
      </p>
      <p className="fieldList">
        <span className="fieldName">UserName</span>: {formValue.userName}
      </p>
      <p className="fieldList">
        <span className="fieldName">Gender</span>: {formValue.gender}
      </p>
      <p className="fieldList">
        <span className="fieldName">Email</span>: {formValue.email}
      </p>
      <p className="fieldList">
        <span className="fieldName">Contact</span>: {formValue.contactNumber}
      </p>
      <p className="fieldList">
        {" "}
        <span className="fieldName">Payment Option</span>:{" "}
        {formValue.paymentOption}
      </p>
      <p className="fieldList">
        {" "}
        <span className="fieldName">CardNumber</span>: {formValue.cardNumber}
      </p>
      <div style={{ marginBottom: "0 auto" }}>
        {" "}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          style={{ float: "left", display: "block" }}
        >
          Back
        </Button>
        <Button
          onClick={finish}
          variant="contained"
          color="secondary"
          style={{ float: "right", display: "block" }}
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;