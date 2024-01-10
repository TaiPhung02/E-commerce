import React from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

import axios from "axios";
import { useState, useEffect } from "react";
import "../../App.css";
import { Pagination } from "antd";
import "react-lazy-load-image-component/src/effects/blur.css";
import Carousel from "./Carousel";
import Category from "./Category";
import Card from "./Card";

function ProductList() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(50);
    const [dataCategory, setDataCategory] = useState([]);

    const fetchRecords = (page) => {
        axios
            .get(
                `https://backoffice.nodemy.vn/api/products?populate=*&pagination[page]=${page}&pagination[pageSize]=4`
            )
            .then((res) => {
                setList(res.data.data);
                setTotal(res.data.meta.pagination.total);
            })
            .catch((err) => {});
    };

    useEffect(() => {
        fetchRecords(page);
    }, [page]);

    useEffect(() => {
        axios.get("https://backoffice.nodemy.vn/api/categories").then((res) => {
            setDataCategory(res.data.data);
        });
    }, []);

    const handleFilterCategory = (slug) => {
        axios
            .get(
                `https://backoffice.nodemy.vn/api/products?&populate=*&pagination[page]=${page}&pagination[pageSize]=4&filters[idCategories][slug][$in][0]=${slug}`
            )
            .then((res) => {
                setList(res.data.data);
            });
    };

    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.7,
        }
    );

    document.querySelectorAll("LazyLoadImage").forEach((img) => {
        observer.observe(img);
    });

    if (!list) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className="container-hero">
                <Category
                    data={dataCategory}
                    handleFilterCategory={handleFilterCategory}
                ></Category>
                <Carousel></Carousel>
            </div>
            <div className="m-2">
                <MDBContainer>
                    <MDBRow className="mb-3">
                        {list?.map((product) => {
                            return (
                                <Card key={product.id} product={product}></Card>
                            );
                        })}
                    </MDBRow>
                </MDBContainer>
            </div>
            <>
                <Pagination
                    total={total}
                    pageSize={4}
                    current={page}
                    onChange={(page) => setPage(page)}
                />
            </>
        </>
    );
}

export default ProductList;
