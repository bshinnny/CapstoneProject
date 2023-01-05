import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as productActions from '../../../store/products';
import ProductCard from '../ProductCard';
import './UserProducts.css';

function UserProducts() {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state => state.products.userProducts);
    // console.log(products);

    useEffect(() => {
        dispatch(productActions.getUserProductsThunk())
    }, [dispatch])

    // const dispatchEdit = (e) => {
    //     e.preventDefault();
    //     history.push(`/products/${product.id}/edit`)
    // }

    return (
        <div className='all-products-cont'>
            <h2 className='user-products-header'>My Listed Products</h2>
            <div className='product-card-div'>
                {Object.values(products).map((product) => {
                    return (
                        <div className='user-product-card-div'>
                            <ProductCard key={`product-${product.id}`} product={product}/>
                            <div className='user-products-btn-div'>
                                <button className='user-products-btn clickable' onClick={(e) => {
                                    e.preventDefault();
                                    history.push(`/products/${product.id}/edit`)
                                }}><i class="fa-solid fa-pen-to-square"></i></button>
                                <button className='user-products-btn clickable' onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(productActions.deleteAProductThunk(product.id));
                                    history.push(`/products/user`);
                                }}><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserProducts;
