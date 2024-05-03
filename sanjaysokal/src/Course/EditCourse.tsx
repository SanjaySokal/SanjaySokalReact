
import { useEffect, useState } from 'react';
import Lazy from '../Lazy';
import Course from '../Pages/Course';

interface typeDat {
    id: number
    image: string
    name: string
    description: string
    link: string
}

const EditCourse = () => {
    const [courses, setCourses] = useState<typeDat[]>([]);
    const [view, setView] = useState(<Lazy />)
    useEffect(() => {
        document.title = "All Courses - Sanjay Sokal"
        fetch("https://api.sanjaysokal.com/courses").then(res => res.json()).then(data => {
            setCourses(data);
            setView(<>
                <section>
                    <h2 className="section-heading">Edit All Courses</h2>
                    <div className="container">
                        <div className="row">
                            {
                                courses.map(data => {
                                    return <Course key={data.id} image={`https://api.sanjaysokal.com/api/course/${data.image}`} name={data.name} description={data.description} link={`/manager/course/edit/${data.link}`} />
                                })
                            }
                        </div>
                    </div>
                </section>
            </>)
        })
    }, [courses])
    return (
        <>
            {view}
        </>
    )
}

export default EditCourse
