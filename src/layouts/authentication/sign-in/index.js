// React components
import { useState } from "react";
import { useTranslation } from 'react-i18next'

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/login.jpg";
import { adminTeacherloginAPI } from "services/API";
import { forgetpasswordAdminAPI } from "services/API";

function Basic() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [formErrors, setFormErrors] = useState([]);
  const [sbLogin, setSbLogin] = useState(false);
  const [sbForgot, setSbForgot] = useState(false);
  const [sbForgotSuccess, setSbForgotSuccess] = useState(false);

  // It is a hook imported from 'react-i18next'
  const { t } = useTranslation(); 

  const sbForgotFn = () => setSbForgot(!sbForgot);

  // Validation
  const handleValidation = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!email) {
      formIsValid = false;
      formErrors["email_error"] = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      formIsValid = false;
      formErrors["email_error"] = "Please enter a valid Email.";
    }
    if (!password) {
      formIsValid = false;
      formErrors["password_error"] = "Password is required.";
    }

    setFormErrors(formErrors);
    return formIsValid;
  };

  // Validation
  const forgotValidation = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!forgotEmail) {
      formIsValid = false;
      formErrors["forgotEmail_error"] = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(forgotEmail)) {
      formIsValid = false;
      formErrors["forgotEmail_error"] = "Please enter a valid Email.";
    }

    setFormErrors(formErrors);
    return formIsValid;
  };

  // API Function
  const adminTeacherloginAPIFn = () => {
    let data = {
      email: email,
      password: password,
    };
    adminTeacherloginAPI(data)
      .then((res) => {
        if (res.data.message) {
          localStorage.setItem("accessToken", res.data.token);
          localStorage.setItem("userEmail", res.data.result.email);
          // localStorage.setItem(
          //   "adminData",
          //   JSON.stringify(res.data.result)
          // );
          setSbLogin(true);
          setTimeout(() => {
            setSbLogin(false);
            navigate("/dashboard");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log("error login", err);
      });
  };

  const forgetpasswordAdminAPIFn = () => {
    let data = {
      email: forgotEmail,
    };
    forgetpasswordAdminAPI(data)
      .then((res) => {
        if (res.data.message) {
          setSbForgot(false);
          setSbForgotSuccess(true);
          setTimeout(() => {
            setSbForgotSuccess(false);
          }, 5000);
        }
      })
      .catch((err) => {
        console.log("error forgot", err);
      });
  };

  return (
    <>
      <MDSnackbar
        color="success"
        icon="check"
        title="Log In"
        content="You are Logged in Successfully."
        open={sbLogin}
        close={() => setSbLogin(false)}
      />
      <MDSnackbar
        color="success"
        icon="check"
        title="Forgot Password"
        content="Email sent successfully, Please check your mail inbox to reset the password."
        open={sbForgotSuccess}
        close={() => setSbForgotSuccess(false)}
      />
      <MDSnackbar
        color="light"
        icon="lock"
        title="Forgot Password"
        content={
          <>
            <MDBox pt={3} pb={3} px={3}>
              <MDTypography
                display="block"
                variant="button"
                color="info"
                mb={5}
              >
                You will receive an e-mail in maximum 60 seconds
              </MDTypography>
              <MDBox component="form" role="form">
                <MDBox mb={4}>
                  <MDInput
                    type="email"
                    label="Email"
                    variant="standard"
                    focused
                    fullWidth
                    onChange={(e) => setForgotEmail(e.target.value)}
                  />
                  {formErrors.forgotEmail_error && (
                    <MDTypography
                      display="block"
                      mt={1}
                      variant="caption"
                      color="error"
                    >
                      {formErrors.forgotEmail_error}
                    </MDTypography>
                  )}
                </MDBox>

                <MDBox mt={6} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={() => {
                      if (forgotValidation()) {
                        forgetpasswordAdminAPIFn();
                      }
                    }}
                  >
                    reset
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </>
        }
        open={sbForgot}
        close={sbForgotFn}
      />
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {t('sign_in')}
            </MDTypography>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              sx={{ mt: 1, mb: 2 }}
            >
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href="#"
                  variant="body1"
                  color="white"
                >
                  <FacebookIcon color="inherit" />
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href="#"
                  variant="body1"
                  color="white"
                >
                  <GitHubIcon color="inherit" />
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography
                  component={MuiLink}
                  href="#"
                  variant="body1"
                  color="white"
                >
                  <GoogleIcon color="inherit" />
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={4} pb={1} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  label="Email"
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
                  type="password"
                  label="Password"
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
                <MDTypography
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                  onClick={sbForgotFn}
                >
                  {t('forgot_password')}?
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  onClick={() => {
                    if (handleValidation()) {
                      adminTeacherloginAPIFn();
                    } else {
                      console.log("Else");
                    }
                  }}
                >
                  {t('sign_in')}
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  {t("have_not_account")}?{" "}
                  <MDTypography
                    component={Link}
                    to="/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    {t('sign_up')}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
    </>
  );
}

export default Basic;
