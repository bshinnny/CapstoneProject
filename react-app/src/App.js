import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllProducts from './components/Products/AllProducts';
import CreateProductForm from './components/Products/CreateProductForm';
import ProductDetails from './components/Products/ProductDetails';
import UserProducts from './components/Products/UserProducts';
import EditProductForm from './components/Products/EditProductForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/products' exact={true}>
          <AllProducts />
        </Route>
        <ProtectedRoute path='/products/user' exact={true}>
          <UserProducts />
        </ProtectedRoute>
        <ProtectedRoute path='/products/new' exact={true}>
          <CreateProductForm />
        </ProtectedRoute>
        <Route path='/products/:productId' exact={true}>
          <ProductDetails />
        </Route>
        <ProtectedRoute path='/products/:productId/edit' exact={true}>
          <EditProductForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <h1>My Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
