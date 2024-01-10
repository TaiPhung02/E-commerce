import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [username, setUsername] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [isNav, setIsNav] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            toast.error("Please enter your email or password", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        } else {
            let data = JSON.stringify({
                identifier: email,
                password: password,
            });

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://backoffice.nodemy.vn/api/auth/local/",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    localStorage.setItem("accessToken", response.data.jwt);
                    // localStorage.setItem("user", response.data.user.email);
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user.username)
                    );
                    setIsNav(true);
                    toast.success("Login success", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(`${error.response.data.error.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                    });
                });
        }
    };

    const handleRegister = () => {
        if (!username || !emailRegister || !passwordRegister) {
            toast.error("Please enter your username, email or password", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        } else {
            let data = JSON.stringify({
                username: username,
                email: emailRegister,
                password: passwordRegister,
            });

            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://backoffice.nodemy.vn/api/auth/local/register",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    toast.success("Register success", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                })
                .catch((error) => {
                    toast.error(`${error.response.data.error.message}`, {
                        position: "top-right",
                        autoClose: 2000,
                    });
                });
        }
    };

    useEffect(() => {
        const data = localStorage.getItem("accessToken");
        if (data) {
            setIsNav(true);
        }
    }, []);

    const [justifyActive, setJustifyActive] = useState("tab1");

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };
    return (
        <div>
            {isNav && <Navigate to="/"></Navigate>}
            <MDBContainer
                className="p-3 my-5 d-flex flex-column w-50"
                style={{ marginTop: "80px" }}
            >
                <MDBTabs
                    pills
                    justify
                    className="mb-3 d-flex flex-row justify-content-between"
                >
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClick("tab1")}
                            active={justifyActive === "tab1"}
                        >
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink
                            onClick={() => handleJustifyClick("tab2")}
                            active={justifyActive === "tab2"}
                        >
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane show={justifyActive === "tab1"}>
                        <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <div
                                className="d-flex justify-content-between mx-auto"
                                style={{ width: "40%" }}
                            >
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="facebook-f" size="sm" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="twitter" size="sm" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="google" size="sm" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="github" size="sm" />
                                </MDBBtn>
                            </div>
                            <p className="text-center mt-3">or:</p>
                        </div>
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Email address"
                            id="form1"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Password"
                            id="form2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox
                                name="flexCheck"
                                value=""
                                id="flexCheckDefault"
                                label="Remember me"
                            />
                            <a href="!#">Forgot password?</a>
                        </div>
                        <MDBBtn
                            className="mb-4 w-100"
                            onClick={() => handleLogin()}
                        >
                            Sign in
                        </MDBBtn>
                        <p className="text-center">
                            Not a member?{" "}
                            <a
                                href="/login"
                                onClick={() => handleJustifyClick("tab2")}
                                active={justifyActive === "tab2"}
                            >
                                Register
                            </a>
                        </p>
                    </MDBTabsPane>
                    <MDBTabsPane show={justifyActive === "tab2"}>
                        <div className="text-center mb-3">
                            <p>Sign un with:</p>
                            <div
                                className="d-flex justify-content-between mx-auto"
                                style={{ width: "40%" }}
                            >
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="facebook-f" size="sm" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="twitter" size="sm" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="google" size="sm" />
                                </MDBBtn>
                                <MDBBtn
                                    tag="a"
                                    color="none"
                                    className="m-1"
                                    style={{ color: "#1266f1" }}
                                >
                                    <MDBIcon fab icon="github" size="sm" />
                                </MDBBtn>
                            </div>
                            <p className="text-center mt-3">or:</p>
                        </div>

                        <MDBInput
                            wrapperClass="mb-4"
                            label="Username"
                            id="form1"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Email"
                            id="form1"
                            type="email"
                            value={emailRegister}
                            onChange={(e) => setEmailRegister(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass="mb-4"
                            label="Password"
                            id="form1"
                            type="password"
                            value={passwordRegister}
                            onChange={(e) =>
                                setPasswordRegister(e.target.value)
                            }
                        />
                        <div className="d-flex justify-content-center mb-4">
                            <MDBCheckbox
                                name="flexCheck"
                                id="flexCheckDefault"
                                label="I have read and agree to the terms"
                            />
                        </div>
                        <MDBBtn
                            className="mb-4 w-100"
                            onClick={() => {
                                handleRegister();
                            }}
                        >
                            Sign up
                        </MDBBtn>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        </div>
    );
}
