import {Routes , Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../components/ProductDetails";

function RouterConfig() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product-details/:id" element={<ProductDetails/>}/>
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default RouterConfig