import React from 'react';
import { Link } from 'react-router-dom';

interface data {
    image: string;
    name: string;
    description: string;
    link: string;
}

const Course = (props: data) => {
    return (
        <div className="col-md-4">
            <div className="course-detail">
                <img src={props.image} className="w-100" alt={props.name} title={props.name} />
                <div className="course-content">
                    <h2>{props.name}</h2>
                    <p>
                        {props.description}
                    </p>
                    <Link to={props.link} className="btn">Explore Course</Link>
                </div>
            </div>
        </div>
    )
}

export default Course;