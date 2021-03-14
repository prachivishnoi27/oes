import React from "react";
import { Link, Redirect } from "react-router-dom";

function Login() {
  return (
    <div className="ui container">
      {localStorage.getItem("tokens") ? <Redirect to="/" /> : ""}
      <div className="ui main-wrapper">
        <div className="ui account-content">
          <div className="ui container">
            <div className="ui account-logo">
              <img src="" width="100" alt="Hospital Management System Logo" />
            </div>
            <div className="ui account-box">
              <div className="ui account-wrapper">
                <h3 className="ui account-title">Login</h3>
                <form >
                  <div className="ui form-group">
                    <label>Email Address</label>
                    <input
                      className="ui form-control"
                      name="username"
                      type="username"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="ui form-group">
                    <div className="ui row">
                      <div className="ui col">
                        <label>Password</label>
                      </div>
                      <div className="ui col-auto">
                        <Link className="ui text-muted" to={"/abhi bnana hai"}>
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <input
                      className="ui form-control"
                      name="password"
                      type="password"
                      placeholder="password"
                    />
                  </div>
                  <div className="ui form-group">
                    <label>Login as:</label>
                    <select className="ui form-control" name="type">
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                    </select>
                  </div>
                  <div className="ui form-group text-center">
                    <button
                      className="ui btn btn-primary account-btn"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="ui account-footer">
                    <p>
                      Don't have an account yet?{" "}
                      {/* <Link to={"/register"}>Register Now</Link> */}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;