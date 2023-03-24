import React from "react";

import {info} from "../config/variables"
import Profile from "../assets/images/profile.jpg"


function Header(props) {
    return (
        <section id="home-section" className={props.activeClass.value == 'home' ? 'active': 'inactive'}>
            <div id="image01" className="image">
                <span className="frame">
                    <img src={Profile} alt=""/>
                </span>
            </div>
            <h1 id="text03">
                { info.name }
            </h1>
            <hr id="divider02"/>
            <p id="text04">
               { info.role }
            </p>
        </section>
    );
} 

export default Header;