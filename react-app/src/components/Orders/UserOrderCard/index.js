import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import ErrorImg from '../../../images/unhappy.jpeg';
import * as cartActions from '../../../store/cart';
import './UserOrderCard.css';

function UserOrderCard({ order }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    const dispatchAtc = async (e) => {
        e.preventDefault();
        const data = await dispatch(cartActions.addCartItemThunk(order.product.id));
        if (data) {
            setErrors(data);
            // console.log(errors);
            // return;
        }
        else {
            history.push('/cart')
        }
    }

    const dispatchListing = async (e) => {
        e.preventDefault();
        history.push(`/products/${order.product.id}`)
    }

    return (
        <div className='order-card-cont'>
            <div className='order-card-header'>
                <div className='order-card-header-left'>
                    <div className='order-header-info'>
                        <div className='order-header-info-bit'>
                            <div>TOTAL PRICE</div>
                            <div>{order.price.toFixed(2)}</div>
                        </div>
                        <div className='order-header-info-bit'>
                            <div>QTY</div>
                            <div>{order.quantity}</div>
                        </div>
                        <div className='order-header-info-bit'>
                            <div>SHIP TO</div>
                            <div>{`${order.user.firstName} ${order.user.lastName}`}</div>
                        </div>
                    </div>
                </div>
                <div className='order-card-header-right'>
                    <div className='order-header-info-bit'>
                        {/* <div>ORDER #</div> */}
                        <div>{`ORDER ID: ${order.id}`}</div>
                    </div>
                </div>
            </div>
            <div className='order-link-div'>
                <img src={order.product.imageUrl} alt={order.product.name} className='order-card-image' onError={e => { e.currentTarget.src = ErrorImg}}></img>
                <div className='order-link-text-div'>
                    <NavLink className='order-link' to={`/orders/current/${order.id}`}>
                        <div className='order-card-link-text'>{order.product.name}</div>
                    </NavLink>
                        {errors.length > 0 && <div>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                        </div>}
                    <div className='order-link-btn-div'>
                        <button onClick={dispatchAtc} className='product-details-atc-btn clickable'>Buy It Again</button>
                        <button onClick={dispatchListing} className='product-details-atc-btn-delete clickable'>Go To Listing</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserOrderCard;
