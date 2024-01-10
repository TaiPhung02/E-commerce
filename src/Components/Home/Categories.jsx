import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import Card from "./Card";

function Categories() {
    const [sp, SetSP] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios
            .get(
                `https://backoffice.nodemy.vn/api/products?&populate=*&filters[idCategories][slug][$in][0]=${params?.slug}`
            )
            .then((res) => {
                SetSP(res.data.data);
            })
            .catch((err) => {});
    }, [params]);

    return (
        <>
            <div style={{ marginTop: "80px" }}>
                <MDBContainer>
                    <h1 style={{ margin: "10px 0" }}>
                        Danh sách sản phẩm bán chạy
                    </h1>
                    <MDBRow className="mb-3">
                        {sp?.map((product) => {
                            return (
                                <Card key={product.id} product={product}></Card>
                            );
                        })}
                    </MDBRow>
                </MDBContainer>
            </div>
        </>
    );
}

export default Categories;
