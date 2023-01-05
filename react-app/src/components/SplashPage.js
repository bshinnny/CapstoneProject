import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../store/products';
import Kindle from '../images/kindle.jpg';
import ErrorImg from '../images/unhappy.jpeg';
import './SplashPage.css';

function SplashPage() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.allProducts);
    // console.log(products);

    useEffect(() => {
        dispatch(productActions.getAllProductsThunk())
    }, [dispatch])

    const fashionArr = [];
    const householdArr = [];
    const otherArr = [];
    const beautyArr = [];

    for (let i = 0; i < Object.values(products).length; i++) {
        if (Object.values(products)[i].category === 'Fashion') fashionArr.push(Object.values(products)[i]);
        else if (Object.values(products)[i].category === 'Household') householdArr.push(Object.values(products)[i]);
        else if (Object.values(products)[i].category === 'Beauty') beautyArr.push(Object.values(products)[i]);
        else otherArr.push(Object.values(products)[i])
    }


    const random = Math.floor(Math.random() * 100);
    const fashionSpotlight = fashionArr[random % fashionArr.length];
    const householdSpotlight = householdArr[random % householdArr.length];
    const beautySpotlight = beautyArr[random % beautyArr.length];
    const otherSpotlight = otherArr[random % otherArr.length];
    console.log(fashionSpotlight)

    return (
        <div className='splash-page-cont'>
            <NavLink className='splash-page-fade' exact to={'/products'} back>
                    <img className='splash-page-nl-img' src={Kindle} alt='kindle'></img>
                    <div class='fade'></div>
            </NavLink>
            <div className='splash-page-categories'>
                <div className='sp-category-grid'>
                    <NavLink className='sp-nl-category' exact to={'/products/category/fashion'}>
                        <h3>Shop Fashion</h3>
                        <div className='sp-nl-div'>
                            {fashionSpotlight && <img className='sp-nl-cat-img' alt='fashion-spotlight' src={fashionSpotlight.imageUrl} onError={e => { e.currentTarget.src = ErrorImg}}></img>}
                        </div>
                    </NavLink>
                </div>
                <div className='sp-category-grid'>
                    <NavLink className='sp-nl-category' exact to={'/products/category/beauty'}>
                        <h3>Shop Beauty</h3>
                        <div className='sp-nl-div'>
                            {beautySpotlight && <img className='sp-nl-cat-img' alt='beauty-spotlight' src={beautySpotlight.imageUrl} onError={e => { e.currentTarget.src = ErrorImg}}></img>}
                        </div>
                    </NavLink>
                </div>
                <div className='sp-category-grid'>
                    <NavLink className='sp-nl-category' exact to={'/products/category/household'}>
                        <h3>Shop Household</h3>
                        <div className='sp-nl-div'>
                            {householdSpotlight && <img className='sp-nl-cat-img' alt='household-spotlight' src={householdSpotlight.imageUrl} onError={e => { e.currentTarget.src = ErrorImg}}></img>}
                        </div>
                    </NavLink>
                </div>
                <div className='sp-category-grid'>
                    <NavLink className='sp-nl-category' exact to={'/products/category/other'}>
                        <h3>Shop Miscellaneous</h3>
                        <div className='sp-nl-div'>
                            {otherSpotlight && <img className='sp-nl-cat-img' alt='other-spotlight' src={otherSpotlight.imageUrl} onError={e => { e.currentTarget.src = ErrorImg}}></img>}
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
