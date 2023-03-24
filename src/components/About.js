import React from "react";

import { about } from "../config/variables"


function About(props){
    return (
        <section id="about-section" className={props.activeClass.value == 'about' ? 'active': 'inactive'}>
            <p id="text05">
                About
            </p>
            <p id="text06">
                <span className="p">
                    { about.p1 }
                </span>
                <span className="p">
                    { about.p2 }
                </span>
                <span className="p">
                    { about.p3 }
                    <a href="#contact">
                        get in touch
                    </a>
                    !
                </span>
            </p>
        </section>
    )
}


export default About;