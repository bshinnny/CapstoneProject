const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';
const GET_PRODUCT_DETAILS = 'products/GET_PRODUCT_DETAILS';
const CREATE_A_PRODUCT = 'products/CREATE_A_PRODUCT';

// ACTIONS
export const getAllProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        products
    }
}

export const getProductDetails = (product) => {
    return {
        type: GET_PRODUCT_DETAILS,
        product
    }
}

export const createAProduct = (product) => {
    return {
        type: CREATE_A_PRODUCT,
        product
    }
}

// THUNKS
export const getAllProductsThunk = () => async dispatch => {
    const response = await fetch('/api/products');

    if (response.ok) {
        const products = await response.json();
        dispatch(getAllProducts(products));
        return response;
    }
}

export const getProductDetailsThunk = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`);

    if (response.ok) {
        const product = await response.json();
        dispatch(getProductDetails(product));
        return response;
    }
}

export const createAProductThunk = (product) =>  async dispatch => {
    const response = await fetch(`/api/products`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })

    if (response.ok) {
        const product = await response.json();
        dispatch(createAProduct(product))
        return product;
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
    allProducts: {},
    productDetails: {}
}

export default function productsReducer(state= initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            const productsArr = action.products.Products;
            const productsObj = formatData(productsArr);
            newState = {...state, allProducts: productsObj};
            return newState;
        case CREATE_A_PRODUCT:
            newState = {...state, allProducts: {...state.allProducts}};
            newState.allProducts[action.product.id] = action.product;
            return newState;
        case GET_PRODUCT_DETAILS:
            const productDetails = action.product;
            newState = {...state, productDetails};
            return newState;
        default:
            return state;
    }
}
