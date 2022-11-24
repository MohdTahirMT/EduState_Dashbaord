// React components
import { useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

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
import bgImage from "assets/images/forget.jpg";
import { ChangePasswordAdminAPI } from "services/API";

function Cover() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [sbChangePass, setSbChangePass] = useState(false);

  // Validation
  const handleValidation = () => {
    let formErrors = {};
    let formIsValid = true;

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
  const ChangePasswordAdminAPIFn = () => {
    let data = {
      email: localStorage.getItem("userEmail"),
      password: password,
      cnfm_password: confirmPassword,
    };
    ChangePasswordAdminAPI(data)
      .then((res) => {
        if (res.data.message) {
          setSbChangePass(true);
          setTimeout(() => {
            setSbChangePass(false);
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("error login", err);
      });
  };
  return (
    <>
      <MDSnackbar
        color="success"
        icon="check"
        title="Change Password"
        content="Your Password Successfully Changed."
        open={sbChangePass}
        close={() => setSbChangePass(false)}
      />
      <CoverLayout coverHeight="50vh" image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
              Change Password
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={3}>
                <MDInput
                  type="password"
                  label="New Password"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
                {formErrors.password_error && (
                  <MDTypography
                    display="block"
                    mt={1}
                    variant="caption"
                    color="error"
                  >
                    {formErrors.password_error}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mb={3}>
                <MDInput
                  type="password"
                  label="Confirm Password"
                  variant="standard"
                  fullWidth
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {formErrors.confirmPassword_error && (
                  <MDTypography
                    display="block"
                    mt={1}
                    variant="caption"
                    color="error"
                  >
                    {formErrors.confirmPassword_error}
                  </MDTypography>
                )}
                {formErrors.equalPassword_error && (
                  <MDTypography
                    display="block"
                    mt={1}
                    variant="caption"
                    color="error"
                  >
                    {formErrors.equalPassword_error}
                  </MDTypography>
                )}
              </MDBox>
              <MDBox mt={6} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={() => {
                    if (handleValidation() && password === confirmPassword) {
                      ChangePasswordAdminAPIFn();
                    } else {
                      console.log("Else");
                    }
                  }}
                >
                  Proceed
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default Cover;
