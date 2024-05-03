import React from 'react';
import { Link } from 'react-router-dom';

const HomeBanner: React.FC = () => {
    return (
        <div id="about" className="banner-img">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Welcome To <span className="name">Sanjay Sokal</span></h2>
                        <p>
                            Hi, I'm Sanjay Sokal, a <b>Web Developer</b> with 3 years of experience at <b>Grow With Us Ventures</b>. I completed my <b>Bachelor's Degree from Mahendergarh</b> in 2022 & currently pursuing <b>MCA from Chandigarh University</b>. Seeking opportunities as a <b>Frontend developer</b> to contribute my skills and expand my expertise in frontend development.
                        </p>
                        <div className="banner-btns">
                            <Link className="btn" to="/about">
                                Hire Me
                            </Link>
                            <Link className="btn-rev" to="/contact">
                                Contact Me
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner