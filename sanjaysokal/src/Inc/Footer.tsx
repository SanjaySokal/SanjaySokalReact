import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'

const Footer: React.FC = () => {
    return (
        <footer className="shadow">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>About us</h3>
                        <Link to="/" className="logo">
                            <img src={logo} alt="Sanjay Sokal" title="Sanjay Sokal" />
                        </Link>
                        <p>
                            Whenever possible FamilySearch makes images and indexes available for all users. However, rights to view these data are limited by contract and subject to change.
                        </p>
                    </div>

                    <div className="col-md-3">
                        <h3>Main Links</h3>
                        <ul>
                            <li>
                                <Link to="/">
                                    <i className="fa-solid fa-paperclip"></i> Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    <i className="fa-solid fa-paperclip"></i> About
                                </Link>
                            </li>
                            <li>
                                <Link to="/images">
                                    <i className="fa-solid fa-paperclip"></i> Free Images
                                </Link>
                            </li>
                            <li>
                                <Link to="/web-templates">
                                    <i className="fa-solid fa-paperclip"></i> Website Templates
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses">
                                    <i className="fa-solid fa-paperclip"></i> Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    <i className="fa-solid fa-paperclip"></i> Contact
                                </Link>
                            </li>
                            <li>
                                <a href="https://sanjaysokal.com/blogs/" rel='noreferrer' target={'_blank'}>
                                    <i className="fa-solid fa-paperclip"></i> Read Blogs
                                </a>
                            </li>
                            <li>
                                <a href="https://naturalscience.sanjaysokal.com/" rel='noreferrer' target={'_blank'}>
                                    <i className="fa-solid fa-paperclip"></i> Natural Science
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-5">
                        <h3>Get in Touch</h3>
                        <p>Sanjay Sokal, Khairoli, Haryana 123028</p>
                        <div className="footer-contact">
                            <div className="icon">
                                <i className="fa-solid fa-headset"></i>
                                <a href="tel:+91-82-95-67-3601">+91-82-95-67-3601</a>
                            </div>
                            <div className="icon">
                                <i className="fa-solid fa-inbox"></i>
                                <a href="mailto:contact@sanjaysokal.com">contact@sanjaysokal.com</a>
                            </div>
                            <div className="icon">
                                <a href="https://www.youtube.com/@sokalhtml" rel="noreferrer" target={'_blank'}>
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                                <a href="https://www.facebook.com/sanjay.sokal.9/" rel="noreferrer" target={'_blank'}>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="https://instagram.com/sanjay.sokal/" rel="noreferrer" target={'_blank'}>
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="https://twitter.com/SanjaySokal6" rel="noreferrer" target={'_blank'}>
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/sanjaysokal/" rel="noreferrer" target={'_blank'}>
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copy-right">Copyright &copy; 2023 | All Rights Reserved | Sanjay Sokal</div>
        </footer>
    )
}

export default Footer