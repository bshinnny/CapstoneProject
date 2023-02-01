import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Logo from '../images/yellow-arrow.png';
import Github from '../images/github.png';
import './NavBar.css'

const NavBar = () => {
    const history = useHistory();

    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const user = useSelector(state => state.session.user);

    const handleDropdown = () => {
        if (showDropdown) return;
        setShowDropdown(true);
    }

    const openCart = (e) => {
        e.preventDefault();
        history.push(`/cart`)
    }

    const dispatchSearch = (e) => {
        e.preventDefault();
        // dispatch(productActions.getSearchTermsThunk(searchTerm));
        history.push(`/products/search/${searchTerm}`);
    }

    useEffect(() => {
        if(!showDropdown) return;

        const closeDropdown = () => {
            setShowDropdown(false);
        }

        document.addEventListener('click', closeDropdown);

        return () => document.removeEventListener('click', closeDropdown)
    }, [showDropdown])

    return (
        <nav>
            {user ?
            <div className='nav-bar-cont-user'>
                <div className='nav-bar-logo-div'>
                    <NavLink className='nav-bar-logo-nl' exact to='/'>
                        <img className='logo' alt='branazon-logo' src={Logo}></img>
                        <h1 className='nav-bar-heading'>Branazon</h1>
                    </NavLink>
                </div>
                <div className='search-input'>
                    <input
                        type='text'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder='Search Amazon'
                        required
                        className='input'
                    />
                    <button onClick={dispatchSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className='nav-bar-profile-cart-div'>
                    {/* <a className='github-img-link' href='https://github.com/bshinnny'>
                        <img className='github-img' src={Github} alt='github'></img>
                    </a> */}
                    <button className='nav-bar-cart-button clickable' onClick={openCart}><i className="fa-solid fa-cart-shopping 3xl"></i></button>
                    <button className='nav-bar-profile-button clickable' onClick={handleDropdown}>
                        <div>Profile Details</div>
                    </button>
                </div>
                {showDropdown && (
                    <ul className='dropdown'>
                        <NavLink className='dropdown-nl' exact to={'/products/user'}>User Products</NavLink>
                        <NavLink className='dropdown-nl' exact to={'/products/new'}>Create Listing</NavLink>
                        <div>Username: {user.username}</div>
                        <div>Email: {user.email}</div>
                        <LogoutButton />
                    </ul>
                )}
            </div>
            :
            <div className='nav-bar-cont-user'>
                <div className='nav-bar-logo-div'>
                    <NavLink className='nav-bar-logo-nl' exact to='/'>
                        <img className='logo' alt='branazon-logo' src={Logo}></img>
                        <h1 className='nav-bar-heading'>Branazon</h1>
                    </NavLink>
                </div>
                <div className='search-input-div'>
                    <input
                        type='text'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder='Search Amazon'
                        required
                        className='search-input'
                    />
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className='nav-bar-profile-cart-div-no-user'>
                    {/* <a className='github-img-link' href='https://github.com/bshinnny'>
                        <img className='github-img' src={Github} alt='github'></img>
                    </a> */}
                    <NavLink to='/sign-up' exact={true} activeClassName='active' className='nav-bar-link'>
                        Sign Up
                    </NavLink>
                    <NavLink to='/login' exact={true} activeClassName='active' className='nav-bar-link'>
                       Login
                    </NavLink>
                </div>
            </div>}
        </nav>
  );
}

export default NavBar;
