import { useNavigate } from "react-router-dom";
import "../css/product.css"

function Product({product}) {
    const{id,price,image,title,description}=product;

    const navigate=useNavigate();

   
  return (
    <div className="card">
        <img className="image" src={image} />
        <div>
            <p className="title">{title}</p>
            <h3 className="price">{price}$</h3>
        </div>
        <div className="flex-row">
            <button onClick={()=>navigate("/product-details/"+id)}className="detail-button">Ürün Detayı</button>
        </div>
    </div>
  )
}

export default Product