import React from 'react'
import { useParams } from 'react-router-dom';

const CourseEdit = () => {
    const { link } = useParams();
    return (
        <>
            {link}
        </>
    )
}

export default CourseEdit
