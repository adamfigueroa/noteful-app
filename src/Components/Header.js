import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <header className="headerBox">
            <h1>
                <Link to="/" className="headerText">Noteful</Link>
            </h1>
        </header>
    )
}

export default Header