import { AllRoutes } from './routes/AllRoutes';
import { Header,Footer } from './components';
import { FilterProvider } from './context/FilterContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App dark:bg-slate-800">
      <FilterProvider>
      <Header />
      <AllRoutes />
      <ToastContainer />
       <Footer />
       </FilterProvider>
    </div>
  );
}

export default App;
