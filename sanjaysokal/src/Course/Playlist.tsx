import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Heading from '../Pages/Heading'
import Lazy from '../Lazy'

const Playlist = () => {
    const { course_name, id } = useParams();
    const [video, setVideo] = useState("");
    const [view, setVew] = useState(<Lazy />)
    interface typeDat {
        name: string,
        thumbnail: string,
        id: number,
        video_name: string,
        video: string,
        description: string
    }
    const [course, setCourses] = useState<typeDat[]>([]);
    useEffect(() => {
        document.title = "Video Playlist - Sanjay Sokal";
        fetch("https://api.sanjaysokal.com/course-main-video", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ link: course_name, id: id })
        }).then(res => res.json()).then(data => {
            setVideo(data[0].video);
            setVew(<>
                <Heading name='Video Playlist' />
                <section>
                    <div className="container">
                        <div className="playlist">
                            <div className="playlist-1">
                                <div className="video-frame">
                                    <iframe src={video} title={"Subscribe for more"} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                </div>
                                <p>
                                    {data[0].description}
                                </p>
                            </div>
                            <div className="playlist-2">
                                <div className="list">
                                    {course.map(data => {
                                        return <Link key={data.id} to={`/course/${course_name}/${data.id}`}>
                                            <img src={`https://api.sanjaysokal.com/api/course/${data.thumbnail}`} alt={''} />
                                            <p>{data.video_name}</p>
                                        </Link>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section></>)
        })

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
    }, [course_name, id, course, video])

    return (
        <div>
            {view}
        </div>
    )
}

export default Playlist
