import React from 'react';
import img from '../images/development.jpg';
import { Link } from 'react-router-dom';

const HomeCourse: React.FC = () => {
    return (
        <section>
            <h2 className="section-heading">Explore Free Courses</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={img} className="w-100" alt="FullStack Development Course" title="FullStack Development Course" />
                    </div>
                    <div className="col-md-6">
                        <div className="images-home">
                            <h2>Become A FullStack Developer</h2>
                            <p>
                                <b>Explore all courses and become a FullStack Developer.</b>
                            </p>
                            <p>
                                If you want to become a decent front-end or back-end web developer, we recommend learning JavaScript. Discover the basics through a course like Introduction to JavaScript course or the Interactive JavaScript Tutorial, and then move onto a more challenging course when you are comfortable with the basics of the language. Although a lot of online courses let you write code in a code editor directly in your browser, you need to realize that this isn’t how it works in the real world.
                            </p>
                            <Link to="/courses" className="btn">Explore All Courses</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCourse