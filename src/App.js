import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Spinner from './components/Spinner/Spinner';
import SingleProduct from './pages/SingleProduct/SingleProduct';
import MentorProvider from './context/MentorContext';
import { useWindowScroll } from 'react-use';
import Progress from './pages/Progress/Progress';
import ProgressDetails from './pages/ProgressDetails/ProgressDetails';
const Cart = lazy(() => import('./pages/CartContent/CartItems'));
const Homepage = lazy(() => import('./pages/Home/Home'));
const Errorpage = lazy(() => import('./pages/Error/Error'));
const Productlist = lazy(() => import('./pages/Products/ProductList'));
const ProductDetails = lazy(() =>
  import('./pages/SingleProduct/SingleProduct'),
);

export default function App() {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisiblity] = useState(false);

  useEffect(() => {
    if (pageYOffset > 60) {
      setVisiblity(true);
    } else {
      setVisiblity(false);
    }
  }, [pageYOffset]);
  return (
    <Router>
      <Navbar visible={visible} />
      <Suspense fallback={<Spinner />}>
        <MentorProvider>
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/products" component={Productlist}></Route>
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/progress" component={Progress} />
            <Route exact path="/progress/:id" component={ProgressDetails} />
            <Route exact path="*" component={Errorpage}></Route>
          </Switch>
        </MentorProvider>
      </Suspense>
    </Router>
  );
}
