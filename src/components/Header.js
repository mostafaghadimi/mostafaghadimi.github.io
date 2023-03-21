import React from "react";

function Header() {
    return (
        <header id="header">
            <ul id="buttons01" className="buttons">
            <li>
                <a href="#home" className="button n01">
                Home
                </a>
            </li>
            <li>
                <a href="#about" className="button n02">
                About
                </a>
            </li>
            <li>
                <a href="#contact" className="button n03">
                Contact
                </a>
            </li>
            </ul>
            <hr id="divider01"/>
        </header>
    );
} 

export default Header;