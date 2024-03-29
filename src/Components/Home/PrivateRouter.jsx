import { Navigate } from "react-router-dom";

export default function PrivateRouter(props) {
    const data = localStorage.getItem("accessToken");
    // data = JSON.parse(data);
    // console.log(data);

    return data ? props.children : <Navigate to="/login"></Navigate>;
}
