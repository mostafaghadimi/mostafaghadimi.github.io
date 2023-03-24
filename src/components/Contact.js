import React from "react";

import { info, socialMedia, contact } from "../config/variables";


function Contact(props) {
    return (
        <section id="contact-section" className={props.activeClass.value == 'contact' ? 'active': 'inactive'}>
            <p id="text01">
                Contact
            </p>
            <p id="text07">
                { contact.p1 }
            </p>
            <p id="text02">
                <span className="p">
                    <a href={socialMedia.linkedin}>
                        My Linkedin Profile
                    </a>
                    <br/>
                    <a href={`mailto:${info.email}`}>
                        { info.email }
                    </a>
                </span>
            </p>
        </section>
    )
}

export default Contact;