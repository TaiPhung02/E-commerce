import React from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Category(props) {
    const { data, handleFilterCategory } = props;
    return (
        <div className="cat-menu">
            {data?.map((item) => (
                <MDBListGroup
                    className="category-container"
                    horizontal
                    key={item.id}
                >
                    <Link to={"categories/" + item.attributes.slug}>
                        <MDBListGroupItem
                            className="category-item"
                            onClick={() =>
                                handleFilterCategory(item?.attributes?.slug)
                            }
                        >
                            {item?.attributes?.name}
                        </MDBListGroupItem>
                    </Link>
                </MDBListGroup>
            ))}
        </div>
    );
}
