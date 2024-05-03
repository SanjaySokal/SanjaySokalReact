import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Heading from './Heading';

const CourseView = () => {
    interface typeDat {
        name: string,
        thumbnail: string,
        id: number,
        video_name: string,
        video: string
    }

    const { course_name } = useParams();
    const [course, setCourses] = useState<typeDat[]>([]);

    useEffect(() => {
        document.title = "Courses - Sanjay Sokal";
        fetch("https://api.sanjaysokal.com/course-main", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ link: course_name })
        })
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(err => console.log(err))
    }, [course_name])

    return (
        <>
            <Heading name='Course' />
            <section>
                <div className="container">
                    <div className="row">
                        {
                            course.map(data => {
                                return <div key={data.id} className="col-md-4">
                                    <div className="course-videos">
                                        <img className='w-100' src={`https://api.sanjaysokal.com/api/course/${data.thumbnail}`} alt={data.name} title={data.name} />
                                        <p>{data.video_name}</p>
                                        <Link className='btn' to={`/course/${course_name}/${data.id}`}>Watch Now</Link>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default CourseView
