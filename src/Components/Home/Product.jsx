import React from "react";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import {
    addToCart,
    removeFromCart,
    decreaseCart,
} from "../../Features/cartSlice";

function Product(props) {
    const local = JSON.parse(localStorage.getItem("cartItems"));

    const { data, index } = props;
    const dispatch = useDispatch();

    const handleRemoveCart = (data) => {
        dispatch(removeFromCart(data));
    };
    const handleDecreaseCart = (data) => {
        dispatch(decreaseCart(data));
    };
    const handleAddCart = (data) => {
        dispatch(addToCart(data));
    };

    return (
        <>
            <div className="row" key={data.id}>
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                    >
                        <LazyLoadImage
                            effect="blur"
                            src={
                                "https://backoffice.nodemy.vn" +
                                data.attributes?.image?.data?.[0].attributes
                                    ?.url
                            }
                            className="w-100"
                            alt={data.attributes?.name}
                        />
                    </div>
                </div>

                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <p>
                        <strong>{data.attributes?.name}</strong>
                    </p>

                    <p className="product-old-price">
                        Giá cũ:{" "}
                        <del>
                            {Number(data.attributes?.oldPrice).toLocaleString(
                                "vi",
                                {
                                    style: "currency",
                                    currency: "VND",
                                }
                            )}
                        </del>
                    </p>
                    <p className="product-price" style={{ color: "red" }}>
                        Giá KM:{" "}
                        {Number(data.attributes?.price).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                        onClick={() => handleRemoveCart(data)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div
                        className="d-flex mb-4"
                        style={{
                            maxWidth: "200px",
                        }}
                    >
                        <button
                            className="btn btn-primary px-3 me-2"
                            onClick={() => handleDecreaseCart(data)}
                        >
                            <i className="fas fa-minus"></i>
                        </button>

                        <div className="form-outline">
                            <input
                                id="form1"
                                min="0"
                                name="quantity"
                                value={local?.[index]?.cartQuantity}
                                type="number"
                                className="form-control"
                                onChange={() => null}
                            />
                        </div>

                        <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={() => handleAddCart(data)}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>

                    <p className="text-start text-md-center">
                        <strong>
                            {(
                                data.attributes?.price *
                                local?.[index]?.cartQuantity
                            ).toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </strong>
                    </p>
                </div>
                <hr className="my-4" />
            </div>
        </>
    );
}

export default Product;
