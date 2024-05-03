import React, { useEffect } from 'react';
import Call from './Call';
import Heading from './Heading';
import HomeBanner from './HomeBanner';
import ResumeDownload from './ResumeDownload';

const About = () => {
    useEffect(() => {
        document.title = "About - Sanjay Sokal";
    })
    return (
        <>
            <Heading name='About Me / Download Resume' />
            <HomeBanner />
            <ResumeDownload />
            <Call />
        </>
    )
}

export default About