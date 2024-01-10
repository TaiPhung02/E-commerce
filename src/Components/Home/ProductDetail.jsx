import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import * as FaIcons from "react-icons/fa";
import { useDispatch } from "react-redux";

import { addToCart } from "../../Features/cartSlice";

import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function ProductDetail() {
    const [sp, SetSP] = useState({});
    const params = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        history("/cart");
    };

    useEffect(() => {
        axios
            .get(
                `https://backoffice.nodemy.vn/api/products/${params?.slug}?populate=*`
            )
            .then((res) => {
                SetSP(res.data.data);
            })
            .catch((err) => {});
    }, [params]);

    return (
        <div style={{ marginTop: "80px" }}>
            <>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>
                        <Link to="/">Home</Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>
                        <Link to="/">Product</Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem active>
                        {sp.attributes?.name}
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </>
            <div className="product-detail">
                <div className="product-img">
                    <LazyLoadImage
                        effect="blur"
                        src={
                            "https://backoffice.nodemy.vn" +
                            sp.attributes?.image?.data[0].attributes.url
                        }
                        alt=""
                    />
                </div>
                <div className="product-info">
                    <h1 className="product-title">{sp.attributes?.name}</h1>
                    <p className="product-text">
                        ✔ Bảo hành chính hãng 36 tháng.{" "}
                    </p>
                    <p className="product-text">
                        ✔ Hỗ trợ đổi mới trong 7 ngày.{" "}
                    </p>
                    <p className="product-text">
                        ✔ Windows bản quyền tích hợp.{" "}
                    </p>
                    <p className="product-text">
                        ✔ Miễn phí giao hàng toàn quốc.
                    </p>
                    <p>
                        <strong className="product-gift-title">
                            Quà tặng:
                        </strong>
                    </p>
                    <p>
                        <strong className="product-gift">
                            🎁 Balo Lenovo Legion&nbsp;Recon Gaming.
                        </strong>
                    </p>
                    <p>
                        <strong className="product-gift">
                            🎁 Voucher mua Ram Laptop trị giá 500,000đ ( Từ
                            01.04 đến 30.04.2023)
                        </strong>
                    </p>
                    <p>
                        <strong className="product-gift">
                            🎁 01 Mũ AMD & 01 Gối cổ chữ U du lịch
                        </strong>
                    </p>
                    <p>
                        <strong className="product-gift">
                            🎁 Áo mưa GearVN
                        </strong>
                    </p>
                    <p>
                        <strong className="product-gift">
                            🎁 "Lenovo Week", Tai nghe True Wireless Soundpeats
                            Mac trị giá 890,000đ (Từ 19.04 đến 28.04.2023)
                        </strong>
                    </p>
                    <p>
                        <strong className="product-title">
                            Thông số kĩ thuật:
                        </strong>
                    </p>
                    <p className="product-gift">CPU: {sp.attributes?.cpu}</p>
                    <p className="product-gift">RAM: {sp.attributes?.ram}</p>
                    <p className="product-old-price">
                        Giá cũ:
                        <del>
                            {Number(sp.attributes?.oldPrice).toLocaleString(
                                "vi",
                                {
                                    style: "currency",
                                    currency: "VND",
                                }
                            )}
                        </del>
                    </p>
                    <p className="product-price">
                        Giá KM:{" "}
                        {Number(sp.attributes?.price).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                    <div className="btn-detail">
                        <button
                            className="btn-add-detail"
                            onClick={() => handleAddToCart(sp)}
                        >
                            <div className="icon">
                                <FaIcons.FaCartPlus />
                            </div>
                            <span>Add to Bag</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="desc">
                <hr className="h" />
                <h2 className="title-desc">Description</h2>
                <p className="text">{sp.attributes?.description}</p>
            </div>
        </div>
    );
}

export default ProductDetail;
