import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
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
    dispatch(calculateBasket());
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
      </PageContainer>
    </div>
  );
}

export default App;