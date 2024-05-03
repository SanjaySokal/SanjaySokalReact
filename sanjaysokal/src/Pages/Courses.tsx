import React, { useEffect, useState } from 'react'
import Course from './Course';
import Heading from './Heading';
import Call from './Call';
import Lazy from '../Lazy';

interface typeDat {
    id: number
    image: string
    name: string
    description: string
    link: string
}

const Courses = () => {
    const [courses, setCourses] = useState<typeDat[]>([]);
    const [view, setView] = useState(<Lazy />)
    useEffect(() => {
        document.title = "Courses - Sanjay Sokal";
    }, [])
    useEffect(() => {
        fetch("https://api.sanjaysokal.com/courses").then(res => res.json()).then(data => {
            setCourses(data);
            setView(<>
                <Heading name="Courses - Sanjay Sokal" />
                <section>
                    <h2 className="section-heading">Explore Free Courses</h2>
                    <div className="container">
                        <div className="row">
                            {
                                courses.map(data => {
                                    return <Course key={data.id} image={`https://api.sanjaysokal.com/api/course/${data.image}`} name={data.name} description={data.description} link={`/course/${data.link}`} />
                                })
                            }
                        </div>
                    </div>
                </section>
                <Call />
            </>)
        })
    }, [courses])
    return (
        <>
            {view}
        </>
    )
}

export default Courses