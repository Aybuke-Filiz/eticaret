import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
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