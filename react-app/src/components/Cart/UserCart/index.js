import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import ProductCard from '../../Products/ProductCard';
import * as cartActions from '../../../store/cart';
import * as ordersActions from '../../../store/orders';
// import { getAllProductsThunk } from '../../../store/products';
import CartItemCard from '../CartItemCard';
import './UserCart.css';

function UserCart() {
    const dispatch = useDispatch();
    const history = useHistory();
    const cartItems = useSelector(state => state.cart.userCart);
    // const products = useSelector(state => state.products.allProducts);

    const cartItemsArr = Object.values(cartItems);

    let quantityTotal = 0;
    let subTotal = 0;

    // useEffect(() => {
    //     dispatch(getAllProductsThunk())
    // }, [dispatch])

    const dispatchAddOrder = (e) => {
        e.preventDefault();
        dispatch(ordersActions.addOrderThunk());
        history.push('/orders')
    }

    for (let i = 0; i < cartItemsArr.length; i++) {
        quantityTotal += cartItemsArr[i].quantity;
        if (cartItemsArr[i].quantity > 1) {
            subTotal += cartItemsArr[i].Product.price * cartItemsArr[i].quantity;
        } else {
            subTotal += cartItemsArr[i].Product.price
        }
    }

    useEffect(() => {
        dispatch(cartActions.getUserCartThunk())
    }, [dispatch])

    return (
        <>
            <div className='user-cart-container'>
                <div className='cart-items-div'>
                    <h2 className='cart-items-header'>Shopping Cart</h2>
                    {Object.values(cartItems).length ? Object.values(cartItems).map((item) => {
                        return (
                            <CartItemCard key={`cart-item-${item.id}`} item={item}/>
                        )
                    }) :
                    <h2>Please add items to your cart to see them here.</h2>
                    }
                    <div className='user-cart-totals'>
                        <div className='subtotal-price'>
                            {`Subtotal (${quantityTotal} Items): ${Number(subTotal).toFixed(2)}`}
                        </div>
                    </div>
                </div>
                {Object.values(cartItems).length ? <div className='uc-checkout-div'>
                    <div>Your order qualifies for FREE Shipping.</div>
                    <div className='subtotal-price-checkout'>
                        {`Subtotal (${quantityTotal} Items): ${Number(subTotal).toFixed(2)}`}
                    </div>
                    <button className='uc-order-btn clickable' onClick={dispatchAddOrder}>Checkout</button>
                </div> :
                <div className='uc-checkout-div'>Please add items to your cart in order to proceed to checkout.</div>}
            </div>
        </>
    )
}

export default UserCart;
