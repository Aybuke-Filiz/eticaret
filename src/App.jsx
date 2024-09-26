import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, setDrawer, removeFromBasket, setBasket} from './redux/slices/basketSlice'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [dispatch]);

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
    dispatch(setDrawer()); 
    toast.success("Sepetiniz tamamlandı!", {
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
    <div>
      <ToastContainer />
      <PageContainer>
        <Loading />
        <Header />
        <RouterConfig />
        <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          {
            products && products.map((product) => {
              return (
                <div key={product.id}>
                  <div className='flex-row' style={{ padding: "20px" }}>
                    <img style={{ marginRight: "5px" }} src={product.image} width={50} height={50} alt={product.title} />
                    <p style={{ width: "320px", marginRight: "5px" }}>{product.title}[{product.count}]</p>
                    <p style={{ fontWeight: "bold", marginRight: "10px", width: "60px" }}>{product.price}$</p>
                    <button 
                      onClick={() => handleRemove(product)} 
                      style={{ padding: "5px", borderRadius: "5px", backgroundColor: "#DC143C", border: "none", color: "#fff", width: "50px" }}>
                      Kaldır
                    </button>
                  </div>
                </div>
              )
            })
          }
          <div className='flex-column'>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>Toplam Tutar: {totalAmount}$</p>
            <button 
              onClick={handleCompleteOrder} 
              style={{ 
                textAlign:"center",
                margin: "20px auto", 
                padding: "10px 20px", 
                backgroundColor: "darkcyan", 
                color: "white", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer" 
              }}>
              Sepeti Tamamla
            </button>
          </div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;