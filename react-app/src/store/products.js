const GET_ALL_PRODUCTS = 'products/GET_ALL_PRODUCTS';
const GET_PRODUCTS_CAT = 'products/GET_PRODUCTS_CAT';
const GET_PRODUCT_DETAILS = 'products/GET_PRODUCT_DETAILS';
const GET_USER_PRODUCTS = 'products/GET_USER_PRODUCTS';
const CREATE_A_PRODUCT = 'products/CREATE_A_PRODUCT';
const EDIT_A_PRODUCT = 'products/EDIT_A_PRODUCT';
const DELETE_A_PRODUCT = 'products/DELETE_A_PRODUCT';

// ACTIONS
export const getAllProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        products
    }
}

export const getProductsByCat = (products) => {
    return {
        type: GET_PRODUCTS_CAT,
        products
    }
}

export const getProductDetails = (product) => {
    return {
        type: GET_PRODUCT_DETAILS,
        product
    }
}

export const getUserProducts = (products) => {
    return {
        type: GET_USER_PRODUCTS,
        products
    }
}

export const createAProduct = (product) => {
    return {
        type: CREATE_A_PRODUCT,
        product
    }
}

export const editAProduct = (product) => {
    return {
        type: EDIT_A_PRODUCT,
        product
    }
}

export const deleteAProduct = (productId) => {
    return {
        type: DELETE_A_PRODUCT,
        productId
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

export const getProductsByCatThunk = (category) => async dispatch => {
    const response = await fetch(`/api/products/cat/${category}`);

    if (response.ok) {
        const products = await response.json();
        dispatch(getProductsByCat(products));
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

export const getUserProductsThunk = () => async dispatch => {
    const response = await fetch('/api/products/current');

    if (response.ok) {
        const products = await response.json();
        dispatch(getUserProducts(products));
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
        dispatch(createAProduct(product));
        return product;
    }
}

export const editAProductThunk = (product, productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
    })

    if (response.ok) {
        const product = await response.json();
        dispatch(editAProduct(product));
        console.log(product)
        return product;
    }
}

export const deleteAProductThunk = (productId) => async dispatch => {
    const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteAProduct(productId));
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
    categoryProducts: {},
    userProducts: {},
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
        case GET_PRODUCTS_CAT:
            const categoryProductsArr = action.products.Products;
            const categoryProductsObj = formatData(categoryProductsArr);
            newState = {...state, categoryProducts: categoryProductsObj};
            return newState;
        case CREATE_A_PRODUCT:
            newState = {...state, allProducts: {...state.allProducts}};
            newState.allProducts[action.product.id] = action.product;
            return newState;
        case GET_PRODUCT_DETAILS:
            const productDetails = action.product;
            newState = {...state, productDetails};
            return newState;
        case GET_USER_PRODUCTS:
            const userProductsArr = action.products.Products;
            const userProductsObj = formatData(userProductsArr);
            newState = {...state, userProducts: userProductsObj};
            return newState;
        case EDIT_A_PRODUCT:
            newState = {...state, allProducts: {...state.allProducts}, userProducts: {...state.userProducts}};
            newState.allProducts[action.product.id] = action.product;
            newState.userProducts[action.product.id] = action.product;
            return newState;
        case DELETE_A_PRODUCT:
            newState = {...state, allProducts: {...state.allProducts}, userProducts: {...state.userProducts}};
            delete newState.allProducts[action.productId];
            delete newState.userProducts[action.productId];
            return newState;
        default:
            return state;
    }
}
