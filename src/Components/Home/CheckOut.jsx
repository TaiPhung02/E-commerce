import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

import Product from "./Product";

import { clearCart } from "../../Features/cartSlice";

function CheckOut() {
    const dispatch = useDispatch();

    const { cart } = useSelector((state) => state.allCart);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    let tinhTong = () => {
        let { total, quantity } = cart.reduce(
            (cartTotal, cartItem) => {
                let { price, cartQuantity } = cartItem;
                price = cartItem.attributes?.price;
                let itemTotal = price * cartQuantity;

                cartTotal.quantity += cartQuantity;
                cartTotal.total += itemTotal;

                return cartTotal;
            },
            {
                quantity: 0,
                total: 0,
            }
        );
        return { quantity, total };
    };
    return (
        <div>
            <section
                className="h-100 gradient-custom"
                style={{ marginTop: "80px" }}
            >
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h4 className="mb-0">
                                        <strong>
                                            Check your Bag Items - {cart.length}{" "}
                                            items
                                        </strong>
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="shipping-address">
                                        <div className="header">
                                            <h1 className="title">
                                                Shipping Address
                                            </h1>
                                        </div>
                                        <div className="main-content">
                                            <div className="current-address">
                                                <p className="name">
                                                    John Maker
                                                </p>
                                                <p className="address">
                                                    123 Place Ground Street
                                                    Vermont, California United
                                                    States of America
                                                </p>
                                            </div>
                                            <div className="actions">
                                                <Link
                                                    to={"/addresses"}
                                                    className="btn-change"
                                                >
                                                    Change
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="payment-method">
                                        <div className="header">
                                            <h1 className="title">
                                                Payment Method
                                            </h1>
                                        </div>
                                        <div className="main-content">
                                            <div className="current-address">
                                                <span className="pay-card">
                                                    <p className="text">
                                                        <FaIcons.FaCreditCard />
                                                        &ensp;
                                                        <strong>
                                                            Mastercard
                                                        </strong>{" "}
                                                        ending in 1252
                                                    </p>
                                                </span>
                                                <span className="gift">
                                                    <p className="text">
                                                        <FaIcons.FaGift />
                                                        &ensp;
                                                        <strong>
                                                            $ 53.21
                                                        </strong>{" "}
                                                        gift card balance
                                                    </p>
                                                </span>
                                                <p className="checkbox">
                                                    Billing address same as
                                                    Shipping Address
                                                </p>
                                            </div>
                                            <div className="actions">
                                                <Link
                                                    to={"/payments"}
                                                    className="btn-change"
                                                >
                                                    Change
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {cart?.map((data, index) => (
                                        <Product
                                            data={data}
                                            index={index}
                                        ></Product>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm me-1 mb-2"
                                data-mdb-toggle="tooltip"
                                title="Remove item"
                                onClick={handleClearCart}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">
                                        <strong>Bag</strong>
                                    </h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-2 pb-0">
                                            Total Quantity
                                            <span>{tinhTong().quantity}</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-2 mb-3">
                                            <div>
                                                <strong>Total Amount</strong>
                                            </div>
                                            <span>
                                                <strong>
                                                    {tinhTong().total.toLocaleString(
                                                        "vi",
                                                        {
                                                            style: "currency",
                                                            currency: "VND",
                                                        }
                                                    )}
                                                </strong>
                                            </span>
                                        </li>
                                    </ul>

                                    <Link
                                        to={"/"}
                                        type="button"
                                        // className="btn btn-primary btn-lg btn-block"
                                    >
                                        <button
                                            className="btn-go-home"
                                            onClick={handleClearCart}
                                        >
                                            Place your order
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <button className="btn-back-to">
                                <i class="fa-solid fa-chevron-left"></i>
                                <Link to="/cart" className="back">
                                    Back
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CheckOut;
