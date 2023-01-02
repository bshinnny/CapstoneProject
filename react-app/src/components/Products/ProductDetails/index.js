import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as productActions from '../../../store/products';

function ProductDetails() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const { productId } = useParams();

    useEffect(() => {
        dispatch(productActions.getProductDetailsThunk(productId))
    }, [dispatch, productId])

    const product = useSelector(state => state.products.productDetails)

    return (
        <div className='product-details-cont'>
            {product.id}
        </div>
    )
}

export default ProductDetails;
