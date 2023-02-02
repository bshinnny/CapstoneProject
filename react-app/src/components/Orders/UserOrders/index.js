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
            TEST
            <div className='user-orders-card-div'>
                {Object.values(orders).map((order) => {
                    return (
                        <UserOrderCard key={`order-${order.id}`} order={order}/>
                    )
                })}
            </div>
        </div>
    )
}

export default UserOrders;
