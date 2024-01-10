import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBCol,
} from "mdb-react-ui-kit";

import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Features/cartSlice";

function Card(props) {
    const { product } = props;
    const dispatch = useDispatch();

    const handleAddToCart = (data) => {
        dispatch(addToCart(data));
    };
    return (
        <MDBCol size="md">
            <Link
                className="product-card"
                to={"product/" + product.attributes.slug}
                key={product.id}
            >
                <MDBCard>
                    <LazyLoadImage
                        className="card-img"
                        effect="blur"
                        src={
                            "https://backoffice.nodemy.vn" +
                            product.attributes?.image?.data?.[0].attributes?.url
                        }
                        position="top"
                        alt={product.attributes.name}
                    />
                </MDBCard>
            </Link>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle className="card-title">
                        {product.attributes.name}
                    </MDBCardTitle>
                    <MDBCardTitle className="card-old-title">
                        Giá cũ:{" "}
                        <del>
                            {Number(
                                product.attributes?.oldPrice
                            ).toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </del>
                    </MDBCardTitle>
                    <MDBCardText className="card-price">
                        Giá KM:{" "}
                        {Number(product.attributes?.price).toLocaleString(
                            "vi",
                            {
                                style: "currency",
                                currency: "VND",
                            }
                        )}
                    </MDBCardText>
                    <MDBBtn onClick={() => handleAddToCart(product)}>
                        Add to Cart
                    </MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
}

export default Card;
