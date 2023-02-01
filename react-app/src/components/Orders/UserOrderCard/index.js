import { NavLink } from 'react-router-dom';
import ErrorImg from '../../../images/unhappy.jpeg'
import './UserOrderCard.css'

function UserOrderCard({ order }) {
    return (
        <div className='order-card-cont'>
            <NavLink className='order-link' to={`/orders/current/${order.id}`}>

            </NavLink>
        </div>
    )
}

export default UserOrderCard;
