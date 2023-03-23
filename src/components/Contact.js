import React from "react";


function Contact() {
    return (
        <section id="contact-section" className="inactive" style={{"display": "none"}}>
            <p id="text01">
                Contact
            </p>
            <p id="text07">
                Here are the ways to get in touch with me:
            </p>
            <p id="text02">
                <span className="p">
                    <a href="https://linkedin.com/in/mostafaghadimi">
                        My Linkedin Profile
                    </a>
                    <br/>
                    <a href="mailto:mostafa.ghadimi@yahoo.com">
                        mostafa.ghadimi@yahoo.com
                    </a>
                </span>
            </p>
        </section>
    )
}

export default Contact;