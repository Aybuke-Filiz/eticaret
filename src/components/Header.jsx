import { useState } from "react";
import "../css/Header.css"
import { CiSearch } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';

function Header() {
    const [theme,setTheme]=useState(false);
    const navigate=useNavigate();
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


  return (
    <div style={{display:"flex" ,flexDirection:"row",alignItems:"center", justifyContent:"space-between"}} >
        <div className="flex-row "onClick={()=>navigate("/")}>
            <img className="logo" src="./src/images/Bandage.svg"/>
        </div>
        <div className="flex-row"> 
            <input className="search-input"type="text" placeholder="Ürün ara"/>
            <div className="icon">
            <CiSearch />
            {theme ?<FaRegMoon  onClick={changeTheme} /> :<CiLight onClick={changeTheme}/>}
            <Badge badgeContent={4} color="success">
            <CiShoppingBasket style={{marginRight:"6px"}}/>
    </Badge>
            
            </div>
        </div>
    </div>
  )
}

export default Header