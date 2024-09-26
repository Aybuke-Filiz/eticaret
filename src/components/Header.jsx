import { useState } from "react";
import "../css/Header.css"
import { CiSearch } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";
import { toast } from "react-toastify"; 

function Header() {

    const [theme,setTheme]=useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch=useDispatch();

    const navigate=useNavigate();
    const{products}=useSelector((store)=>store.basket);

    const changeTheme=()=>{
        const root=document.getElementById("root");
        if(theme){
            root.style.backgroundColor="black";
            root.style.color="#fff";
        }else{
            root.style.backgroundColor="#fff";
            root.style.color="black";
        }
        setTheme(!theme);

    }
    const handleSearch = () => {
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filteredProducts.length === 0) {
            toast.error("Ürün bulunamadı!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            console.log("Bulunan Ürünler:", filteredProducts);
            
        }
    }

  return (
    <div style={{display:"flex" ,flexDirection:"row",alignItems:"center", justifyContent:"space-between"}} >
        <div className="flex-row "onClick={()=>navigate("/")}>
            <img className="logo" src="./src/images/Bandage.svg"/>
        </div>
        <div className="flex-row"> 
            <input className="search-input"
                    type="text"
                    placeholder="Ürün ara"
                    value={searchTerm}  
                    onChange={(e) => setSearchTerm(e.target.value)} />
                    
            <div className="icon">
            <CiSearch  onClick={handleSearch}/>
            {theme ?<FaRegMoon  onClick={changeTheme} /> :<CiLight onClick={changeTheme}/>}
            <Badge onClick={()=>dispatch(setDrawer())}badgeContent={products.length} color="success">
            <CiShoppingBasket style={{marginRight:"6px"}}/>
    </Badge>
            
            </div>
        </div>
    </div>
  )
}

export default Header