import React from "react";
import Profile from "../assets/images/profile.jpg"


function Header() {
    return (
        <section id="home-section" className="active">
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