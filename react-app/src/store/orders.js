const ADD_ORDER = 'orders/ADD_ORDER';
const GET_USER_ORDERS = 'orders/GET_USER_ORDERS';
const DELETE_AN_ORDER = 'orders/DELETE_AN_ORDER';

// ACTIONS
export const addOrder = (products) => {
    return {
        type: ADD_ORDER,
        products
    }
}

export const getUserOrders = (orders) => {
    return {
        type: GET_USER_ORDERS,
        orders
    }
}

// THUNKS
export const addOrderThunk = () => async dispatch => {
    const response = await fetch('/api/orders', {
        method: 'POST'
    })

    if (response.ok) {
        const products = await response.json();
        dispatch(addOrder(products));
        return products;
    }
}

export const getUserOrdersThunk = () => async dispatch => {
    const response = await fetch('/api/orders/current');

    if (response.ok) {
        const orders = await response.json();
        dispatch(getUserOrders(orders));
        return response;
    }
}

// Format initial data.
const formatData = (array) => {
    const object = {};
    array.forEach(item => {
        object[item.id] = item;
    });
    return object;
}

// REDUCER
const initialState = {
    userOrders: {}
}

export default function ordersReducer(state= initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case ADD_ORDER:
            const newOrdersArr = action.products.newOrders;
            for (const newOrder of newOrdersArr) {
                newState.userOrders[newOrder.id] = newOrder;
            }
            return newState;
        case GET_USER_ORDERS:
            const userOrdersArr = action.orders.Orders;
            const userOrdersObj = formatData(userOrdersArr);
            newState = {...state, userOrders: userOrdersObj};
            return newState;
        default:
            return state;
    }
}
