import { useState } from "react";
import "../css/Header.css";
import { CiSearch } from "react-icons/ci";
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slices/basketSlice";
import { toast } from "react-toastify";
import { Drawer } from "@mui/material";

function Header() {
    const [theme, setTheme] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basketProducts = useSelector((store) => store.basket.products);
    const productProducts = useSelector((store) => store.product.products); 

    const changeTheme = () => {
        const root = document.getElementById("root");
        if (theme) {
            root.style.backgroundColor = "black";
            root.style.color = "#fff";
        } else {
            root.style.backgroundColor = "#fff";
            root.style.color = "black";
        }
        setTheme(!theme);
    }

    const handleSearch = () => {
        const results = productProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (results.length === 0) {
            toast.error("Ürün bulunamadı!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setFilteredProducts([]); 
            setDrawerOpen(false); 
        } else {
            setFilteredProducts(results);
            setDrawerOpen(true); 
        }
    }

    const handleProductClick = (id) => {
        navigate(`/product-details/${id}`); 
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div className="flex-row" onClick={() => navigate("/")}>
                <img className="logo" src="./src/images/Bandage.svg" alt="Logo" />
            </div>
            <div className="flex-row"> 
                <input className="search-input"
                    type="text"
                    placeholder="Ürün ara"
                    value={searchTerm}  
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <div className="icon">
                    <CiSearch onClick={handleSearch} />
                    {theme ? <FaRegMoon onClick={changeTheme} /> : <CiLight onClick={changeTheme} />}
                    <Badge onClick={() => dispatch(setDrawer())} badgeContent={basketProducts.length} color="success">
                        <CiShoppingBasket style={{ marginRight: "6px" }} />
                    </Badge>
                </div>
            </div>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div style={{ padding: "20px" }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product.id)} className="search-result-item" style={{ cursor: "pointer" }}>
                {product.title} 
              </div>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </Drawer>
        </div>
    );
}
export default Header;
