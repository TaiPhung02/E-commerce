import React, { Suspense } from "react";
// import ProductList from "./ProductList";

const ProductList = React.lazy(() => import("./ProductList"));

function Home() {
    return (
        <>
            {/* <h1>Home</h1> */}
            <Suspense fallback={<div>Loading</div>}>
                <ProductList></ProductList>
            </Suspense>
        </>
    );
}

export default Home;
