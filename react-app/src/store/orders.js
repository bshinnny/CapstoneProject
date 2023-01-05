const ADD_ORDER = 'orders/ADD_ORDER';

// ACTIONS
export const addOrder = (message) => {
    return {
        type: ADD_ORDER,
        message
    }
}

// THUNKS
export const addOrderThunk = () => async dispatch => {
    const response = await fetch('/api/orders', {
        method: 'POST'
    })

    if (response.ok) {
        const message = await response.json();
        dispatch(addOrder(message));
        return message;
    }
}

// REDUCER
const initialState = {
    orders: {}
}

export default function ordersReducer(state= initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case ADD_ORDER:
            const message = action.message;
            newState = {...state, orders: message};
            return newState;
        default:
            return state;
    }
}
