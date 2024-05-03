import React from 'react';
import img from '../images/web-templste.jpg';
import { Link } from 'react-router-dom';

const HomeTemplate = () => {
    return (
        <section>
            <h2 className="section-heading">Download Free Website Template</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={img} className="w-100" alt="Free Website Template Download Sanjay Sokal" title="Free Website Template Download Sanjay Sokal" />
                    </div>
                    <div className="col-md-6">
                        <div className="images-home">
                            <h2>Explore Website Template</h2>
                            <p>
                                Like blogging, this is also a very good way, every website owner and blogger needs template themes i.e. good site design. If you blog, then you must have downloaded the template from somewhere and installed it in your blog, you must know that with free template there is a good and best template on the internet, it is more popular. Overwhelmed by all the steps involved in formatting business letter correspondence? A template can help. You can use these templates to create a variety of business and employment letters.
                            </p>
                            <Link to="/web-templates" className="btn">Get Free Website Template</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeTemplate