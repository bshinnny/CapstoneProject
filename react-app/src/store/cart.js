const GET_USER_CART = 'cart/GET_USER_CART';
const EDIT_ITEM_QTY = 'cart/EDIT_ITEM_QTY';
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM';
const ADD_CART_ITEM = 'cart/ADD_CART_ITEM'

// ACTIONS
export const getUserCart = (cartItems) => {
    return {
        type: GET_USER_CART,
        cartItems
    }
}

export const editItemQty = (cartItem) => {
    return {
        type: EDIT_ITEM_QTY,
        cartItem
    }
}

export const deleteCartItem = (cartItemId) => {
    return {
        type: DELETE_CART_ITEM,
        cartItemId
    }
}

export const addCartItem = (cartItem) => {
    return {
        type: ADD_CART_ITEM,
        cartItem
    }
}

// THUNKS
export const getUserCartThunk = () => async dispatch => {
    const response = await fetch('/api/cart');

    if (response.ok) {
        const cartItems = await response.json();
        dispatch(getUserCart(cartItems));
        return response;
    }
}

export const editItemQtyThunk = (quantity, cartItemId) => async dispatch => {
    const response = await fetch(`/api/cart/${cartItemId}/quantity`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(quantity)
    })

    if (response.ok) {
        const cartItem = await response.json();
        dispatch(editItemQty(cartItem));
        return cartItem;
    }
}

export const deleteCartItemThunk = (cartItemId) => async dispatch => {
    const response = await fetch(`/api/cart/${cartItemId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteCartItem(cartItemId));
    }
}

export const addCartItemThunk = (productId) => async dispatch => {
    const response = await fetch(`/api/cart/products/${productId}`, {
        method: 'POST'
    })

    if (response.ok) {
        const cartItem = await response.json();
        dispatch(addCartItem(cartItem));
        return;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
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
    userCart: {}
}

export default function cartReducer(state=initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_USER_CART:
            const cartItemsArr = action.cartItems.Cart;
            const cartItemsObj = formatData(cartItemsArr);
            newState = {...state, userCart: cartItemsObj};
            return newState;
        case EDIT_ITEM_QTY:
            newState = {...state, userCart: {...state.userCart}};
            newState.userCart[action.cartItem.id] = action.cartItem;
            return newState;
        case DELETE_CART_ITEM:
            newState = {...state, userCart: {...state.userCart}};
            delete newState.userCart[action.cartItemId];
            return newState;
        case ADD_CART_ITEM:
            newState = {...state, userCart: {...state.userCart}};
            newState.userCart[action.cartItem.id] = action.cartItem;
            return newState;
        default:
            return state;
    }
}
