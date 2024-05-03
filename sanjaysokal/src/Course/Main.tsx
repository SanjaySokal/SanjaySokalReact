import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddCourse from './AddCourse'
import AddVideo from './AddVideo'
import CourseEdit from './CourseEdit'
import EditCourse from './EditCourse'
import EditVideo from './EditVideo'
import Head from './Head'

const Main = () => {
    const navigate = useNavigate();
    var user_email: string | undefined = "";
    var a = document.cookie.split(';')
    var js: { user_email: string | undefined; } = { user_email: "" };
    a.map(data => {
        var val_b;
        var a = data.split("=")[0].replace(" ", "");
        var b = data.split("=")[1];
        if (a === "login") {
            val_b = b;
            js = { user_email: val_b }
        }
        return js;
    })
    user_email = js.user_email;
    if (user_email !== "sokalsanjay@gmail.com") {
        navigate("/login", { replace: true });
    }

    return (
        <>
            <Head />
            <Routes>
                <Route path='/add-course-for-view' element={<AddCourse />} />
                <Route path='/add-video-for-view' element={<AddVideo />} />
                <Route path='/edit-course' element={<EditCourse />} />
                <Route path='/edit-video' element={<EditVideo />} />
                <Route path='/course/edit/:link' element={<CourseEdit />} />
            </Routes>
        </>
    )
}

export default Main
