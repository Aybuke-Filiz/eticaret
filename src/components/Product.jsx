import "../css/product.css"

function Product({product}) {
    const{id,price,image,title,description}=product;

   
  return (
    <div className="card">
        <img className="image" src={image} />
        <div>
            <p>{title}</p>
            <h3>{price}</h3>
        </div>
    </div>
  )
}

export default Product