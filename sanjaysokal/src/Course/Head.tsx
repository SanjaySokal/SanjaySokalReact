import React from 'react'
import { Link } from 'react-router-dom';

const Head: React.FC = () => {
    return (
        <header className='admin'>
            <nav className="container desktop-menu">
                <ul className="nav-links m-auto">
                    <li>
                        <Link to="/manager/add-course-for-view">Add Course</Link>
                    </li>
                    <li>
                        <Link to="/manager/add-video-for-view">Add Video</Link>
                    </li>
                    <li>
                        <Link to="/manager/edit-course">Edit Course</Link>
                    </li>
                    <li>
                        <Link to="/manager/edit-video">Edit Video</Link>
                    </li>
                    <li>
                        <Link to="/manager/edit-video">Add Interview Questions & Answer</Link>
                    </li>
                    <li>
                        <Link to="/manager/edit-video">Edit Interview Questions & Answer</Link>
                    </li>
                </ul>
            </nav >
        </header>
    )
}

export default Head;