import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function menuDrop() {
    var drop = document.querySelector(".nav-dropdown")
    if (drop?.classList.contains("d-block")) {
        drop.classList.remove("d-block")
    } else {
        drop?.classList.add("d-block")
    }
}

var loginLogout: React.ReactElement;
var headers: React.ReactElement;

var loggedin: boolean | string | undefined = false;
var user_email: string | undefined = "";

var a = document.cookie.split(';')

var js: { loggedin: boolean | string | undefined; user_email: string | undefined; } = { loggedin: false, user_email: "" };

a.map(data => {
    var val_a;
    var val_b;
    var a = data.split("=")[0].replace(" ", "");
    var b = data.split("=")[1];
    if (a === "login") {
        val_a = a;
        val_b = b;
        js = { loggedin: val_a, user_email: val_b }
    }
    return js;
})

loggedin = js.loggedin;
user_email = js.user_email;

function delete_cookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

if (loggedin) {
    loginLogout = <Link to="#" className='profile-link' onClick={menuDrop}>
        <div className='row'>
            <img src='https://sanjaysokal.com/favicon.png' alt='Alt tag' title='Name' />
            <span>{user_email} &nbsp;<i className="fa-solid fa-caret-down"></i></span>
        </div>
        <ul className='nav-dropdown'>
            {(user_email === "sokalsanjay@gmail.com") ? <li><Link to={'/manager'}>Manage Website</Link></li> : null}
            <li>
                <Link to={'/profile'}>My Profile</Link>
            </li>
            <li>
                <Link to={'/upload-image'}>Upload Images</Link>
            </li>
            <li>
                <Link to={'/upload-website'}>Upload Website</Link>
            </li>
            <li>
                <Link to={'#'} onClick={() => {
                    loggedin = false;
                    delete_cookie("login");
                    window.location.reload()
                }}>Logout</Link>
            </li>
        </ul>
    </Link>
} else {
    loginLogout = <>
        <Link to="/login">
            Login
        </Link>
        <Link to="/register">
            Register
        </Link>
    </>
}

if (window.innerWidth >= 991) {
    headers = <nav className="container desktop-menu">
        <div className="nav-logo">
            <Link to="/" className="logo">
                <img src={logo} alt="Sanjay Sokal" title="Sanjay Sokal" />
            </Link>
        </div>
        <ul className="nav-links">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/courses">Courses</Link>
            </li>
            <li>
                <Link to="/images">Images</Link>
            </li>
            <li>
                <Link to="/web-templates">Web Templates</Link>
            </li>
            <li>
                <Link to="/work-with-me">Work With Me</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
        <div className="nav-login">
            {loginLogout}
        </div>
    </nav>
} else {
    headers = <nav className="container mobile-menu">
        <div className="nav-logo">
            <Link to="/" className="logo">
                <img src={logo} alt="Sanjay Sokal" title="Sanjay Sokal" />
            </Link>
        </div>
        <button type="button" onClick={() => {
            var links = document.querySelector(".menu-mobile")
            if (links?.classList.contains("d-block")) {
                links.classList.remove("d-block")
            } else {
                links?.classList.add("d-block")
            }
        }}>
            <i className="fa-solid fa-bars"></i>
        </button>
        <div className="menu-mobile">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/courses">Courses</Link>
                </li>
                <li>
                    <Link to="/images">Images</Link>
                </li>
                <li>
                    <Link to="/web-templates">Web Templates</Link>
                </li>
                <li>
                    <Link to="/work-with-me">Work With Me</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
            <div className="nav-login">
                {loginLogout}
            </div>
        </div>
    </nav >
}

const Header: React.FC = () => {
    return (
        <header>
            {headers}
        </header>
    )
}

export default Header;