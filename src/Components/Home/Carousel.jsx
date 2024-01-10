import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

export default function Carousel() {
    const [list, setList] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        fade: true,
        speed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true,
    };

    useEffect(() => {
        axios
            .get("https://backoffice.nodemy.vn/api/homepage?populate=*")
            .then((res) => {
                setList(res?.data?.data?.attributes?.leftBanner?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {list?.map((product) => {
                    return (
                        <div key={product.id}>
                            <img
                                effect="blur"
                                className="w-100 d-block"
                                src={
                                    "https://backoffice.nodemy.vn" +
                                    product?.attributes?.url
                                }
                                alt="..."
                            />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
