import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Logo from '../images/yellow-arrow.png';
import './NavBar.css'

const NavBar = () => {
    const history = useHistory();

    const [showDropdown, setShowDropdown] = useState(false);

    const user = useSelector(state => state.session.user);

    const handleDropdown = () => {
        if (showDropdown) return;
        setShowDropdown(true);
    }

    const openCart = (e) => {
        e.preventDefault();
        history.push(`/cart`)
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
                    <NavLink className='nav-bar-logo-nl' exact to='/products'>
                        <img className='logo' alt='branazon-logo' src={Logo}></img>
                        <h1 className='nav-bar-heading'>Branazon</h1>
                    </NavLink>
                </div>
                <div className='nav-bar-profile-cart-div'>
                    <button className='nav-bar-cart-button' onClick={openCart}>CART</button>
                    <button className='nav-bar-profile-button' onClick={handleDropdown}>
                        <div>Profile Details</div>
                        <i className="fa-solid fa-circle-chevron-down"></i>
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
            <div className='nav-bar-cont-no-user'>
                <div className='nav-bar-logo-div'>
                    <NavLink className='nav-bar-logo-nl' exact to='/products'>
                        <img className='logo' alt='branazon-logo' src={Logo}></img>
                        <h1 className='nav-bar-heading'>Branazon</h1>
                    </NavLink>
                </div>
                <div className='nav-bar-profile-cart-div'>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                    </NavLink>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                       Login
                    </NavLink>
                </div>
            </div>}
        </nav>
        // <nav>
        //     <ul>
        //         <li>
        //             <NavLink to='/' exact={true} activeClassName='active'>
        //                 Home
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to='/login' exact={true} activeClassName='active'>
        //                 Login
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to='/sign-up' exact={true} activeClassName='active'>
        //                 Sign Up
        //             </NavLink>
        //         </li>
        //         <li>
        //             <NavLink to='/users' exact={true} activeClassName='active'>
        //                 Users
        //             </NavLink>
        //         </li>
        //         <li>
        //               <LogoutButton />
        //         </li>
        //     </ul>
        // </nav>
  );
}

export default NavBar;
