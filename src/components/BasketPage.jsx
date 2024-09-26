
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, removeFromBasket, setBasket } from '../redux/slices/basketSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const BasketPage = () => {
  const { products, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (product) => {
    dispatch(removeFromBasket(product));  
    dispatch(calculateBasket()); 
    
    toast.error(`${product.title} sepetten kaldırıldı!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleCompleteOrder = () => {
    localStorage.clear(); 
    dispatch(setBasket([])); 
    dispatch(calculateBasket());
    toast.success("Tebrikler! Siparişiniz oluşturuldu.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    navigate('/');
  };

  return (
    <div className="basket-page">
      <h1 style={{fontWeight:"bold",color:"#8B0000",fontFamily:"arial",fontSize:"50px"}}>SEPETİNİZ</h1>
      <div className='flex-column'>
        {products.length === 0 ? (
          <p style={{color:"#191970",fontFamily:"arial",fontSize:"30px"}}>Sepetiniz boş!</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className='flex-row' style={{ padding: "20px" }}>
              <img src={product.image} width={50} height={50} alt={product.title} style={{ marginRight: "5px" }} />
              <p style={{ width: "320px", marginRight: "5px" }}>{product.title} [{product.count}]</p>
              <p style={{ fontWeight: "bold", marginRight: "10px", width: "60px" }}>{product.price}$</p>
              <button 
                onClick={() => handleRemove(product)} 
                style={{ padding: "5px", borderRadius: "5px", backgroundColor: "#DC143C", border: "none", color: "#fff", width: "50px" }}>
                Kaldır
              </button>
            </div>
          ))
        )}
        <p style={{ textAlign: "center", fontWeight: "bold" ,fontFamily:"arial",color:"Highlight",fontSize:"20px"}}>Toplam Tutar: {totalAmount}$</p>
        <button 
          onClick={handleCompleteOrder} 
          disabled={products.length === 0}
          style={{ 
            textAlign: "center", 
            margin: "20px auto", 
            padding: "10px 20px", 
            backgroundColor: products.length === 0 ? "gray" : "darkcyan", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: products.length === 0 ? "not-allowed" : "pointer"
          }}>
          Sepeti Tamamla
        </button>
      </div>
    </div>
  );
};

export default BasketPage;