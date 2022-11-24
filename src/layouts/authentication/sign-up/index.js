// React components
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/signup.jpg";
import { adminRegistrationAPI } from "../../../services/API";

function Cover() {
  const navigate = useNavigate();

  // Hooks
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [show, setShow] = useState(false);

  // Reset Form
  let resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setConfirmPassword("");
  };

  // Validation
  const handleValidation = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      formErrors["name_error"] = "Name is required.";
    }
    if (!email) {
      formIsValid = false;
      formErrors["email_error"] = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      formIsValid = false;
      formErrors["email_error"] = "Please enter a valid Email.";
    }
    if (!mobile) {
      formIsValid = false;
      formErrors["mobile_error"] = "Mobile Number is required.";
    }
    if (!password) {
      formIsValid = false;
      formErrors["password_error"] = "Password is required.";
    }
    if (!confirmPassword) {
      formIsValid = false;
      formErrors["confirmPassword_error"] = "Confirm Password is required.";
    }
    if (password !== confirmPassword) {
      formIsValid = false;
      formErrors["equalPassword_error"] =
        "Password and Confirm Password did not match.";
    }

    setFormErrors(formErrors);
    return formIsValid;
  };

  // API Function
  const adminRegistrationAPIFn = () => {
    let data = {
      name: name,
      email: email,
      mobile: mobile,
      password: password,
      cPassword: confirmPassword,
    };
    adminRegistrationAPI(data)
      .then((res) => {
        if (res.data.message) {
          setShow(true);
          resetForm();
          setTimeout(() => {
            setShow(false);
            navigate("/sign-in");
          }, 2500);
        }
      })
      .catch((err) => {
        console.log("error signup", err);
      });
  };

  return (
    <>
      <MDSnackbar
        color="success"
        icon="check"
        title="Sign Up"
        content="Your Registration is Successful."
        open={show}
        close={() => setShow(false)}
      />
      <CoverLayout image={bgImage}>
        <Card style={{ marginTop: -55 }}>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your email and password to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Name"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
              </MDBox>
              {formErrors.name_error && (
                <MDTypography
                  display="block"
                  mb={1}
                  variant="caption"
                  color="error"
                >
                  {formErrors.name_error}
                </MDTypography>
              )}
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </MDBox>
              {formErrors.email_error && (
                <MDTypography
                  display="block"
                  mb={1}
                  variant="caption"
                  color="error"
                >
                  {formErrors.email_error}
                </MDTypography>
              )}
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Mobile"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setMobile(e.target.value)}
                />
              </MDBox>
              {formErrors.mobile_error && (
                <MDTypography
                  display="block"
                  mb={1}
                  variant="caption"
                  color="error"
                >
                  {formErrors.mobile_error}
                </MDTypography>
              )}
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </MDBox>
              {formErrors.password_error && (
                <MDTypography
                  display="block"
                  mb={1}
                  variant="caption"
                  color="error"
                >
                  {formErrors.password_error}
                </MDTypography>
              )}
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </MDBox>
              {formErrors.confirmPassword_error && (
                <MDTypography
                  display="block"
                  mb={1}
                  variant="caption"
                  color="error"
                >
                  {formErrors.confirmPassword_error}
                </MDTypography>
              )}
              {formErrors.equalPassword_error && (
                <MDTypography
                  display="block"
                  mb={1}
                  variant="caption"
                  color="error"
                >
                  {formErrors.equalPassword_error}
                </MDTypography>
              )}
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={() => {
                    if (handleValidation() && password === confirmPassword) {
                      adminRegistrationAPIFn();
                    } else {
                      console.log("Else");
                    }
                  }}
                >
                  sign up
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default Cover;
