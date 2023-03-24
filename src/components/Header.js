import React from "react";


function Header(props) {
    const handleClick = (value) => {
        props.setActiveClassValue({value});
    }
    return (
        <header id="header">
            <ul id="buttons01" className="buttons">
            <li onClick={() => handleClick('home')}>
                <a href="#home" className="button n01">
                Home
                </a>
            </li>
            <li onClick={() => handleClick('about')}>
                <a href="#about" className="button n02">
                About
                </a>
            </li>
            <li onClick={() => handleClick('contact')}>
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