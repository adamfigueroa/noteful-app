import React from 'react';
import { Link } from 'react-router-dom';

// Add functionality to load mainpage onCLick

const Header = () => {
    return (
        <header className="headerBox">
            <h1 className="headerText">
                <Link to="/">Noteful</Link>
            </h1>
        </header>
    )
}

export default Header