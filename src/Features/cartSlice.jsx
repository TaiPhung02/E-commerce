import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingIndex >= 0) {
                state.cart[existingIndex] = {
                    ...state.cart[existingIndex],
                    cartQuantity: state.cart[existingIndex].cartQuantity + 1,
                };
                toast.info("Increased product quantity", {
                    position: "top-right",
                    autoClose: 2000,
                });
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cart.push(tempProductItem);
                toast.success("Product added to cart", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cart));
        },

        getCartTotal: (state) => {
            let { total, quantity } = state.cart.reduce(
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
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },

        removeFromCart: (state, action) => {
            state.cart.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCart = state.cart.filter(
                        (item) => item.id !== cartItem.id
                    );

                    state.cart = nextCart;

                    toast.error("Product removed from cart", {
                        position: "top-right",
                        autoClose: 2000,
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cart));
                return state;
            });
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cart.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cart[itemIndex].cartQuantity > 1) {
                state.cart[itemIndex].cartQuantity -= 1;

                toast.info("Decreased product quantity", {
                    position: "top-right",
                    autoClose: 2000,
                });
            } else if (state.cart[itemIndex].cartQuantity === 1) {
                const nextCart = state.cart.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cart = nextCart;

                toast.error("Product removed from cart", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cart));
        },
        clearCart(state, action) {
            state.cart = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cart));
            toast.error("Cart cleared", {
                position: "top-right",
                autoClose: 2000,
            });
        },
    },
});

export const {
    addToCart,
    getCartTotal,
    removeFromCart,
    decreaseCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
