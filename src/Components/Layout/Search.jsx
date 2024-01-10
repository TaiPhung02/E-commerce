import React from "react";
import { MDBCol } from "mdbreact";

const SearchPage = () => {
    return (
        <MDBCol md="5">
            <input
                style={{ height: "45px" }}
                className="form-control"
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                aria-label="Search"
            />
        </MDBCol>
    );
};

export default SearchPage;
