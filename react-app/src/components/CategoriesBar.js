import { NavLink } from 'react-router-dom';
import './CategoriesBar.css';

function CategoriesBar() {
    return (
        <nav>
            <div className='categories-bar-cont'>
                <NavLink className='cb-nl-cat' exact to={'/products'}>All Products</NavLink>
                <NavLink className='cb-nl-cat' exact to={'/products/category/fashion'}>Fashion</NavLink>
                <NavLink className='cb-nl-cat' exact to={'/products/category/household'}>Household</NavLink>
                <NavLink className='cb-nl-cat' exact to={'/products/category/beauty'}>Beauty</NavLink>
                <NavLink className='cb-nl-cat' exact to={'/products/category/other'}>Other</NavLink>
            </div>
        </nav>
    )
}

export default CategoriesBar;
