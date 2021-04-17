import React from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import { Field } from "redux-form";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import textField from "../shared/TextField";
import Logo from "../../image/logo.png";

export default function reset(props) {
  const { handleSubmit } = props;

  return (
    <>
      <Grid
        container
        className="errorContainer"
        justify="center"
        alignItems="center"
        style={{ height: '80vh'}}
      >
        <Grid item xs={11} lg={3} container className="loginContainer">
          <Grid
            item
            container
            xs={12}
            lg={12}
            className="loginInputContainer"
            justify="center"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              lg={6}
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <img src={Logo} alt="logo" style={{ width: "70%" }} />
              <h3 className="message" style={{ textAlign: 'center', color: 'white'}}>Please enter your new password</h3>
              <Field
                name="password"
                label="New Password"
                type="password"
                component={textField}
                className="loginInput"
                color="secondary"
                InputProps={{ className: "loginInput" }}
                InputLabelProps={{ className: "loginInputLabel" }}
              />
              <Field
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                component={textField}
                className="loginInput"
                color="secondary"
                InputProps={{ className: "loginInput" }}
                InputLabelProps={{ className: "loginInputLabel" }}
              />
              <div style={{ height: 30 }} />
              <Button
                variant="contained"
                color="secondary"
                className="loginBtn"
                type="submit"
                value="ok"
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
              <Link to="/signup" style={{ textDecoration: "none" }}></Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
