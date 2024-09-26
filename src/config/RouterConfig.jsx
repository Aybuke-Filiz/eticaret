import {Routes , Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import ProductDetails from "../components/ProductDetails";
import BasketPage from "../components/BasketPage";

function RouterConfig() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product-details/:id" element={<ProductDetails/>}/>
        <Route path="/basket" element={<BasketPage />} /> 
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default RouterConfig