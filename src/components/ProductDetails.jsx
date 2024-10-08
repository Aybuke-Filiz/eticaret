import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { setSelectedProduct } from "../redux/slices/productSlice";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { addToBasket, calculateBasket } from "../redux/slices/basketSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductDetails() {
    const {id}=useParams();
    const{products,selectedProduct}=useSelector((store)=>store.product)
    const{price,image,title,description}=selectedProduct;

    const[count,setCount]=useState(0);

    const dispatch=useDispatch();

    const increment=()=>{
        setCount(count+1)
    }
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    }

    const addBasket=()=>{
        const payload={
            id,
            price,
            image,
            title,
            description,
            count
        }
        dispatch(addToBasket(payload));
        dispatch(calculateBasket());
    }

    useEffect(()=>{
        getProductById();
    },[])

const getProductById=()=>{
    products && products.map((product)=>{
        if(product.id==id){
            dispatch(setSelectedProduct(product));
        }
    })
}

  return (
    <div style={{marginTop:"30px",display:"flex",flexDirection:"row",justifyContent:"center"}}>
        <div style={{marginRight:"40px"}}>
        <img src={image} width={300} height={500}/>
        </div>
        <div className="flex-column">
            <h1 style={{fontFamily:"arial",color:"#CD853F"}}>{title}</h1>
            <p style={{fontFamily:"arial",fontSize:"20px",color:"grey"}}>{description}</p>
            <h2 style={{fontSize:"50px",fontWeight:"bold", color:"#2F4F4F"}}>{price}$</h2>
            <div className="flex-row">
                <CiCircleMinus onClick={decrement}style={{fontSize:"40px",marginRight:"5px"}}/>
                <span style={{fontSize:"35px"}}>{count}</span>
                <CiCirclePlus  onClick={increment} style={{fontSize:"40px",marginLeft:"5px"}}/>
            </div>
            <div>
            <button 
    onClick={() => {
        addBasket();
        toast.success('Ürün sepete eklendi!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }}
    disabled={products.length === 0 || count === 0}
    style={{
        marginTop: "25px",
        border: "none",
        padding: "15px",
        backgroundColor: products.length === 0 || count === 0 ? "gray" : "darkcyan",
        color: "antiquewhite",
        borderRadius: "5px",
        cursor: products.length === 0 ? "not-allowed" : "pointer"
    }}>
    Sepete Ekle
</button>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails