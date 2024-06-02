import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from "./Components/Header";
import ProductShowCase from './Pages/ProductShowcase/index';
import Login from './Pages/Login/index';
import './App.css';
import Products from './Pages/Products/Products';
import ProductsAdd from './Pages/ProductsAdd/index';
import ProductsEdit from './Pages/ProductsEdit/index';

function RoutesApp() {
    return (
        <HashRouter>
            <Header />
            <div className="wrapper">
                <Routes>
                    <Route path='/' element={<ProductShowCase />} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/products/add' element={<ProductsAdd />} />
                    <Route path='/products/edit' element={<ProductsEdit />} />
                    {/*<Route path='/productShowcase' element={<ProductShowCase/>} />*/}
                </Routes>
            </div>            
        </HashRouter>   
    )
}

export default RoutesApp;