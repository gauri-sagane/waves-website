import React, { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainLayout from './hoc/mainLayout';

import Header from './components/navigation/header';
import Footer from './components/navigation/footer';
import Home from './components/home';
import RegisterLogin from './components/auth';
import Shop from './components/shop';
import Loader from './utils/loader';
import { useDispatch, useSelector } from 'react-redux'
import { userIsAuth, userSignOut } from './store/actions/user.actions';

import Dashboard from './components/dashboard';
import AuthGuard from './hoc/authGuard';
import UserInfo from './components/dashboard/user/info';
import AdminProducts from './components/dashboard/admin/products';
import AddProduct from './components/dashboard/admin/products/addedit/add';
import EditProduct from './components/dashboard/admin/products/addedit/edit';
import ProductDetail from './components/product';

const App = (props) => {

  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(userSignOut())
  }

  useEffect(() => {
    dispatch(userIsAuth())
  }, [dispatch])

  useEffect(() => {
    if(users.auth !== null){
      setLoading(false)
    }
  }, [users])

  return (
    <BrowserRouter>
      { loading ? 
        <Loader full={true}/>
        :
        <>
          <Header
            users={users}
            signOutUser={signOutUser}
          />
              <MainLayout>
                <Routes>
                  <Route path="/dashboard/admin/edit_product/:id" element = {AuthGuard(EditProduct) } />
                  <Route path="/dashboard/admin/add_products" element = {AuthGuard(AddProduct) } />
                  <Route path="/dashboard/admin/admin_products" element = {AuthGuard(AdminProducts) } />
                  <Route path="/dashboard/user/user_info" element = {AuthGuard(UserInfo) } />
                  <Route path="/dashboard" element = {AuthGuard(Dashboard) } />
                  <Route path="/product_detail/:id" element = {<ProductDetail />} />
                  <Route path="/shop" element = {<Shop />} />
                  <Route path="/sign_in" element = {<RegisterLogin />} />
                  <Route path="/" element = {<Home />} />
                </Routes>
              </MainLayout>
              <Footer/>
        </>
      }   
    </BrowserRouter>
  );
}

export default App;
