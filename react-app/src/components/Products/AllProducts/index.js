import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../../store/products';
import ProductCard from '../ProductCard';
import './AllProducts.css';

function AllProducts() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);
    // console.log(products);

    useEffect(() => {
        dispatch(productActions.getAllProductsThunk())
    }, [dispatch])

    return (
        <div className='all-products-cont'>
            <div className='product-card-div'>
                {Object.values(products).map((product) => {
                    return (
                        <ProductCard key={`product-${product.id}`} product={product}/>
                    )
                })}
            </div>
        </div>
    )
}

export default AllProducts;
