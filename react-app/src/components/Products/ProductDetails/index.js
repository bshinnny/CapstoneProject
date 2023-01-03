import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as productActions from '../../../store/products';
import './ProductDetails.css'

function ProductDetails() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { productId } = useParams();

    useEffect(() => {
        dispatch(productActions.getProductDetailsThunk(productId))
    }, [dispatch, productId])

    const product = useSelector(state => state.products.productDetails);

    const dollarAmt = Math.floor(product.price);
    const centAmt = (product.price - dollarAmt).toPrecision(2) * 100;

    let delivery = new Date();
    delivery.setDate(delivery.getDate() + 2);
    const dateStr = delivery.toDateString();

    return (
        <div className='product-details-cont'>
            <img src={product.imageUrl} alt={product.name} className='product-details-image'></img>
            <div className='product-info'>
                <div className='product-info-header'>
                    <h2 className='product-info-name'>{product.name}</h2>
                    <div className='product-info-brand'>{`Produced by ${product.brand}.`}</div>
                    <div className='product-info-reviews'>Ratings and reviews coming soon.</div>
                    <div className='amazon-choice'><i class="fa-solid fa-medal"> </i>Branazon's Choice</div>
                </div>
                <div className='product-info-price'>
                    <div className='price-dollar-sign'>$</div>
                    <div className='price-dollar'>{`${dollarAmt}`}</div>
                    {centAmt !== 0 ? <div className='price-cent'>{` ${centAmt}`}</div> : <div className='price-cent'>{` 00`}</div>}
                </div>
                <div className='product-info-details'>
                    <div className='product-info-details-half'>
                        <div className='product-info-details-bold'>
                            <div>Color</div>
                            <div>Brand</div>
                            <div>Dimensions</div>
                            <div>Weight</div>
                            <div>ASIN</div>
                        </div>
                        <div className='product-info-details-nb'>
                            <div>{product.color}</div>
                            <div>{product.brand}</div>
                            <div>{`${product.length}"L x ${product.width}"W x ${product.height}"H`}</div>
                            <div>{`${product.weight} LBS`}</div>
                            <div>{product.asin}</div>
                        </div>
                    </div>
                </div>
                <div className='product-info-description'>
                    <div>{product.description}</div>
                </div>
            </div>
            <div className='product-details-atc'>
                <div className='product-info-price-atc'>
                    <div className='price-dollar-sign-atc'>$</div>
                    <div className='price-dollar-atc'>{`${dollarAmt}`}</div>
                    {centAmt !== 0 ? <div className='price-cent-atc'>{` ${centAmt}`}</div> : <div className='price-cent'>{` 00`}</div>}
                </div>
                <div className='product-details-atc-text'>FREE Returns!</div>
                <div className='product-details-atc-text'>{`Free 2 day delivery by ${dateStr} with Branazon Prime!`}</div>
                <div className='product-details-atc-stock'>In Stock.</div>
            </div>
        </div>
    )
}

export default ProductDetails;