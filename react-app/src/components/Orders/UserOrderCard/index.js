import { NavLink } from 'react-router-dom';
import ErrorImg from '../../../images/unhappy.jpeg'
import './UserOrderCard.css'

function UserOrderCard({ order }) {
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
                    <button></button>
                </div>

            </div>
        </div>
    )
}

export default UserOrderCard;
