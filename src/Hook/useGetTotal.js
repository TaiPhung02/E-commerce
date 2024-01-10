import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal } from "../Features/cartSlice";

export default function useGetTotal() {
    const { cart, cartTotalQuantity, cartTotalAmount } = useSelector(
        (state) => state.allCart
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartTotal());
    }, [cart, dispatch]);
    return { cart, cartTotalQuantity, cartTotalAmount };
}
