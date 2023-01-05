import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as productActions from '../../../store/products';
import ProductCard from '../ProductCard';
import './CategoryProducts.css';

function CategoryProducts() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.categoryProducts);
    const { category } = useParams();

    // console.log(products);

    useEffect(() => {
        dispatch(productActions.getProductsByCatThunk(category))
    }, [dispatch, category])

    return (
        <div className='product-category-cont'>
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

export default CategoryProducts;
