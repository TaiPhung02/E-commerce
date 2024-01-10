import React, { useState } from "react";
import {
    MDBInput,
    MDBInputGroup,
    MDBBtn,
    MDBCheckbox,
    MDBValidation,
    MDBValidationItem,
} from "mdb-react-ui-kit";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

function AddPayment() {
    const [formValue, setFormValue] = useState({
        fname: "",
        lname: "",
        email: "",
        city: "",
        state: "",
        zip: "",
    });

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div
                className="payment-method form-address"
                style={{ marginTop: "100px" }}
            >
                <div className="header">
                    <h1 className="title">Select a Card</h1>
                </div>
                <div className="main-content">
                    <div className="current-address">
                        <span className="pay-card">
                            <p className="text">
                                <FaIcons.FaCreditCard />
                                &ensp;
                                <strong>Mastercard</strong> ending in 1252
                            </p>
                        </span>
                        <span className="pay-card">
                            <p className="text">
                                <FaIcons.FaCreditCard />
                                &ensp;
                                <strong>VISA Debit</strong> ending in 2894
                            </p>
                        </span>
                        <p className="checkbox">
                            Billing address same as Shipping Address
                        </p>
                    </div>
                </div>
            </div>
            <div className="form-address">
                <MDBValidation className="row g-3" isValidated>
                    <h1
                        className="title"
                        style={{
                            fontFamily: "Cabin",
                            fontWeight: 400,
                            fontSize: "31.25px",
                            lineHeight: "38px",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            color: "#1a1f16",
                        }}
                    >
                        Add a new Card
                    </h1>
                    <MDBValidationItem className="col-md-12">
                        <MDBInput
                            value={formValue.fname}
                            name="fname"
                            onChange={onChange}
                            id="validationCustom01"
                            required
                            label="First name"
                        />
                    </MDBValidationItem>
                    <MDBValidationItem className="col-md-12">
                        <MDBInput
                            value={formValue.lname}
                            name="lname"
                            onChange={onChange}
                            id="validationCustom02"
                            required
                            label="Last name"
                        />
                    </MDBValidationItem>
                    <MDBValidationItem
                        style={{ paddingBottom: "15px" }}
                        feedback="Please choose a username."
                        invalid
                        className="col-md-12"
                    >
                        <MDBInputGroup textBefore="@">
                            <input
                                type="text"
                                className="form-control"
                                id="validationCustomUsername"
                                placeholder="Username"
                                required
                            />
                        </MDBInputGroup>
                    </MDBValidationItem>
                    <MDBValidationItem
                        className="col-md-12"
                        feedback="Please provide a valid city."
                        invalid
                    >
                        <MDBInput
                            value={formValue.city}
                            name="city"
                            onChange={onChange}
                            id="validationCustom03"
                            required
                            label="City"
                        />
                    </MDBValidationItem>
                    <MDBValidationItem
                        className="col-md-12"
                        feedback="Please provide a valid zip."
                        invalid
                    >
                        <MDBInput
                            value={formValue.zip}
                            name="zip"
                            onChange={onChange}
                            id="validationCustom05"
                            required
                            label="Zip"
                        />
                    </MDBValidationItem>
                    <MDBValidationItem
                        className="col-12"
                        feedback="You must agree before submitting."
                        invalid
                    >
                        <MDBCheckbox
                            label="Agree to terms and conditions"
                            id="invalidCheck"
                            required
                        />
                    </MDBValidationItem>
                    <div className="nav-address">
                        <button className="btn-back-to">
                            <i class="fa-solid fa-chevron-left"></i>
                            <Link to="/checkout" className="back">
                                Back
                            </Link>
                        </button>
                        <div className="col-3">
                            <Link to="/checkout">
                                <MDBBtn type="submit">Submit form</MDBBtn>
                            </Link>
                        </div>
                    </div>
                </MDBValidation>
            </div>
        </>
    );
}

export default AddPayment;
