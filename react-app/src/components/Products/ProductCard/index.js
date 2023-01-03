// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import * as productActions from '../../../store/products';
import { NavLink } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
    return (
        <div className='product-card-cont'>
            <NavLink className='product-link' to={`/products/${product.id}`} key={`product-${product.id}`}>
                <div className='product-card'>
                    <img src={product.imageUrl} alt={product.name} className='product-card-image'></img>
                    <div className='product-card-info'>
                        <div className='product-card-name'>{product.name}</div>
                        <div className='product-card-price'>{`$${product.price}`}</div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default ProductCard;
