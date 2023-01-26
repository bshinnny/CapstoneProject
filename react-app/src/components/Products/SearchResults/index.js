import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as productActions from '../../../store/products';
import ProductCard from '../ProductCard';

function SearchResults() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.searchProducts);
    const { term } = useParams();

    // console.log(products);

    useEffect(() => {
        dispatch(productActions.getSearchTermsThunk(term))
    }, [dispatch, term])

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

export default SearchResults;
