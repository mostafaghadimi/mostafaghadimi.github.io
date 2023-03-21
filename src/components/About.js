import React from "react";


function About(){
    return (
        <section id="about-section" className="inactive" style={{"display": "none"}}>
            <p id="text05">
                About
            </p>
            <p id="text06">
                <span class="p">
                    Hi there! My name is Mostafa Ghadimi and I am a Data Engineer based in Tehran, Iran. I am passionate about Big Data, Parallel Algorithms, Distributed Systems, System Design and Architecture.
                </span>
                <span class="p">
                    Throughout my career, I have had the opportunity to work on a wide range of projects and have developed a diverse set of skills that enable me to contribute to various stages of the project lifecycle, work collaboratively with cross-functional teams, solve complex problems, leverage cutting-edge technologies and tools and stay up-to-date with industry trends and best practices. I am always looking for new challenges and opportunities to learn and grow, and am committed to delivering high-quality work that meets the needs of my clients and colleagues.
                </span>
                <span class="p">
                    If you'd like to learn more about me or my work, please feel free to 
                    <a href="#contact">
                        Get in touch
                        </a>
                    !
                </span>
            </p>
        </section>
    )
}


export default About;