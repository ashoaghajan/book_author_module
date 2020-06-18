import React from 'react';
import { NavLink } from 'react-router-dom';

export interface NavbarProps {
    
}
 
const Navbar: React.FunctionComponent<NavbarProps> = () => {
    return ( 
        <nav>
            <div className="nav-wrapper pink darken-4">
            <h5 className="brand-logo left">Ninja's Reading List</h5>
                <ul id="nav-mobile" className="right">
                    <li><NavLink to='/'>Books</NavLink></li>
                    <li><NavLink to='/authors'>Authors</NavLink></li>
                </ul>
            </div>
        </nav>
     );
}
 
export default Navbar;