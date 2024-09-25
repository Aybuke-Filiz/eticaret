import { useState } from "react";
import "../css/Header.css"
import { CiSearch } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";

function Header() {
    const [theme,setTheme]=useState(false);
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
        <div className="flex-row">
            <img className="logo" src="./src/images/Bandage.svg"/>
        </div>
        <div className="flex-row"> 
            <input className="search-input"type="text" placeholder="Ürün ara"/>
            <div className="icon">
            <CiSearch />
            {theme ?<FaRegMoon  onClick={changeTheme} /> :<CiLight onClick={changeTheme}/>}
            <CiShoppingBasket />
            </div>
        </div>
    </div>
  )
}

export default Header