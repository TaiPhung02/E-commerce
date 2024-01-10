import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "./Product";

import {
    clearCart,
    // getCartTotal,
} from "../../Features/cartSlice";
// import useGetToTal from "../../Hook/useGetTotal";

const Cart = () => {
    const dispatch = useDispatch();

    // su dung customHook
    // const { cart, cartTotalQuantity, cartTotalAmount } = useGetToTal();

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
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <p>Your cart is currently empty</p>
                            <div className="start-shopping">
                                <Link to="/">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-arrow-left"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                                        />
                                    </svg>
                                    <span>Start Shopping</span>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h4 className="mb-0">
                                            <strong>
                                                Check your Bag Items -{" "}
                                                {cart.length} items
                                            </strong>
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        {cart?.map((data, index) => (
                                            <Product
                                                key={data.id}
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
                                                <span>Total Quantity</span>
                                                {/* <span>{cartTotalQuantity}</span> */}
                                                <span>
                                                    {tinhTong().quantity}
                                                </span>
                                            </li>

                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-2 mb-3">
                                                <div>
                                                    <strong>
                                                        Total Amount
                                                    </strong>
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
                                            to={"/checkout"}
                                            type="button"
                                            className="btn btn-primary btn-lg btn-block"
                                        >
                                            Go to checkout
                                        </Link>
                                    </div>
                                </div>
                                <button className="btn-back-to">
                                    <i class="fa-solid fa-chevron-left"></i>
                                    <Link to="/" className="back">
                                        Back
                                    </Link>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Cart;
