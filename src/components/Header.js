import React from "react";

function Header() {
    return (
        <header id="header">
            <ul id="buttons01" class="buttons">
            <li>
                <a href="#home" class="button n01">
                Home
                </a>
            </li>
            <li>
                <a href="#about" class="button n02">
                About
                </a>
            </li>
            <li>
                <a href="#contact" class="button n03">
                Contact
                </a>
            </li>
            </ul>
            <hr id="divider01"/>
        </header>
    );
} 

export default Header;