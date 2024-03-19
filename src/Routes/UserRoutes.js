import React from 'react'
import Header from "../user/component/Header/Header";
import Footer from "../user/component/Footer/Footer";
import Home from "../user/container/Home/Home";
import Category from "../user/container/Shop/Category/Category";
import Cart from "../user/container/Shop/Cart/Cart";
import Checkout from "../user/container/Shop/Checkout/Checkout";
import Confirmation from "../user/container/Shop/Confirmation/Confirmation";
import ProductDetails from "../user/container/Shop/ProductDetails/ProductDetails";
import Elements from "../user/container/Pages/Elements/Elements";
import Login from "../user/container/Pages/Login/Login";
import Tracking from "../user/container/Pages/Tracking/Tracking";
import Blog from "../user/container/Blog/Blog";
import BlogDetail from "../user/container/Blog/BlogDetail/BlogDetail";
import Contact from "../user/container/Contact/Contact";
import { Route, Routes } from 'react-router-dom'

const UserRoutes = () => {
    return (
        <>
            {/* <Header />
            <Routes>
                <Route exact path="/*" element={<Home />} />
                <Route exact path="/category" element={<Category />} />
                <Route exact path="/category/:id" element={<ProductDetails/>}/>
                <Route  path="/" element={<Home />}>
                <Route exact path="/cart" element={<Cart />} />
                </Route>

                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/confirmation" element={<Confirmation />} />
                <Route exact path="/productdetails" element={<ProductDetails />} />
                

                <Route exact path="/elements" element={<Elements />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/tracking" element={<Tracking />} />

                <Route exact path="/blog" element={<Blog />} />
                <Route exact path="/blogdetails" element={<BlogDetail />} />
                <Route exact path="/contact" element={<Contact />} />
            </Routes>
            <Footer /> */}

            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/category" element={<Category />} />
                <Route exact path="/category/:id" element={<ProductDetails />} /> {/* Updated path */}
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/confirmation" element={<Confirmation />} />
                {/* You may want to remove the duplicate route for ProductDetails */}
                {/* <Route exact path="/productdetails" element={<ProductDetails />} /> */}
                <Route exact path="/elements" element={<Elements />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/tracking" element={<Tracking />} />
                <Route exact path="/blog" element={<Blog />} />
                <Route exact path="/blogdetails" element={<BlogDetail />} />
                <Route exact path="/contact" element={<Contact />} />
            </Routes>
            <Footer />

        </>
    )
}

export default UserRoutes
