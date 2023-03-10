import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as orderActions from '../../../store/orders';
import UserOrderCard from '../UserOrderCard';
import './UserOrders.css';

function UserOrders() {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.userOrders);

    useEffect(() => {
        dispatch(orderActions.getUserOrdersThunk())
    }, [dispatch])

    return (
        <div className='user-orders-cont'>
            <div className='orders-header-div'>
                <h2 className='orders-header'>My Orders</h2>
            </div>
            <div className='user-orders-card-div'>
                {Object.values(orders).reverse().map((order) => {
                    return (
                        <UserOrderCard key={`order-${order.id}`} order={order}/>
                    )
                })}
            </div>
        </div>
    )
}

export default UserOrders;
