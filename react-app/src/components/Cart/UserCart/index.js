import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../../../store/cart';
import CartItemCard from '../CartItemCard';
import './UserCart.css';

function UserCart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.userCart)

    useEffect(() => {
        dispatch(cartActions.getUserCartThunk())
    }, [dispatch])

    return (
        <div className='user-cart-container'>
            <div className='cart-items-div'>
                <h2 className='cart-items-header'>Shopping Cart</h2>
                {Object.values(cartItems).map((item) => {
                    return (
                        <CartItemCard key={`cart-item-${item.id}`} item={item}/>
                    )
                })}
            </div>
        </div>
    )
}

export default UserCart;
