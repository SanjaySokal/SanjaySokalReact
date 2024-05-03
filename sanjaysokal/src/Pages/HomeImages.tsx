import React from 'react'
import { Link } from 'react-router-dom';
import galery from '../images/images-gallery.jpg';

const HomeImages = () => {
    return (
        <section>
            <h2 className="section-heading">Download Free Images</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="images-home">
                            <h2>Explore Free Images</h2>
                            <p>
                                Whenever possible FamilySearch makes images and indexes available for all users. However, rights to view these data are limited by contract and subject to change. Because of this there may be limitations on where and how images and indexes are available or who can see them. Please be aware some collections consist only of partial information indexed from the records and do not contain any images.
                            </p>
                            <p>
                                There are many resources for free images, whether public domain, licensed creative commons or inexpensive stock images, so you really shouldn’t need to use copyright-protected works for beautifying your site, creating that cool presentation or making a video. But if you really have to have that image, ask first. You’d be surprised at how many people would gladly grant permission for use of their images.
                            </p>
                            <Link to="/images" className="btn">Get Free Images</Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img src={galery} className="w-100" alt="Free Images Download Sanjay Sokal" title="Free Images Download Sanjay Sokal" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeImages