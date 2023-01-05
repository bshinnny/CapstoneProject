import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as cartActions from '../../../store/cart';
import ErrorImg from '../../../images/unhappy.jpeg'
import './CartItemCard.css'

function CartItemCard({ item }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [quantity, setQuantity] = useState(item.quantity)

    useEffect(() => {
        dispatch(cartActions.editItemQtyThunk(quantity, item.id))
    }, [dispatch, quantity, item.id])

    return (
        <div className='cart-item-cont'>
            <img src={item.Product.imageUrl} alt={item.Product.name} className='cart-item-image' onError={e => { e.currentTarget.src = ErrorImg}}></img>
            <div className='cart-item-info'>
                <NavLink className='cart-item-link' to={`/products/${item.Product.id}`} key={`product-${item.Product.id}`}>
                    <h3 className='cart-item-header'>{item.Product.name}</h3>
                </NavLink>
                <div className='cart-item-instock'>In Stock</div>
                <div style={{ marginBottom: '5px'}}>Eligible for FREE Shipping and FREE returns.</div>
                <div style={{ marginBottom: '5px'}}>{`Color: ${item.Product.color}`}</div>
                <div className='cart-item-options'>
                    <select
                        type='number'
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                        className='cart-item-edit-qty'
                    >
                        <option value='' disabled>
                            Quantity
                        </option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    <button className='cart-item-delete-btn' onClick={(e) => {
                        e.preventDefault();
                        dispatch(cartActions.deleteCartItemThunk(item.id));
                        history.push(`/cart`);
                    }}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div className='cart-item-price'>
                {Number(item.Product.price).toFixed(2)}
            </div>
        </div>
    )
}

export default CartItemCard;
