import React from "react";

import Profile from "../assets/images/profile.jpg"


function Header(props) {
    console.log('props.activeClass', props.activeClass)
    return (
        <section id="home-section" className={props.activeClass.value == 'home' ? 'active': 'inactive'}>
            <div id="image01" className="image">
                <span className="frame">
                    <img src={Profile} alt=""/>
                </span>
            </div>
            <h1 id="text03">
                Mostafa Ghadimi
            </h1>
            <hr id="divider02"/>
            <p id="text04">
                Data Engineer
            </p>
        </section>
    );
} 

export default Header;