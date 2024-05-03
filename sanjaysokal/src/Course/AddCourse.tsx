import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Heading from '../Pages/Heading'
import Input from '../Pages/Input';
import Progress from '../Pages/Progress';

const AddCourse = () => {
    useEffect(() => {
        document.title = "Add Course - Sanjay Sokal"
    })
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const [image, setImage] = useState<any>(null);
    const [bar, setBar] = useState(<></>)
    const [first, setfirst] = useState({
        name: "",
        desc: "",
        link: ""
    })
    function valus(e: React.ChangeEvent<HTMLInputElement>) {
        var nam = e.target.name;
        var dat = e.target.value;
        setfirst({ ...first, [nam]: dat })
    }
    const SendData = async (e: React.FormEvent) => {
        e.preventDefault();

        setResult(null)
        setErrors("wait...")
        var date = new Date();
        var editdate = date.getTime();
        var rand = Math.floor(Math.random() * 100);
        var fila_name = image[0].name.replaceAll(" ", "_");
        fila_name = fila_name.replaceAll("-", "_");
        fila_name = fila_name.split(".")[0] + "_" + editdate + rand + "." + fila_name.split(".")[1];

        var sendthis = { name: first.name, link: first.link, desc: first.desc, file: image[0], file_name: fila_name };


        axios.post("https://api.sanjaysokal.com/add-course", sendthis, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (data) => {
                var loaded = data.loaded;
                var total = (data.total === undefined) ? 0 : (data.total);
                var load = Math.round((loaded / total) * 100)
                setBar(<Progress color="red" file={image[0].name} progress={load} />)
            }
        })
            .then(data => {
                if (data.data.status === true) {
                    setfirst({
                        desc: "",
                        name: "",
                        link: ""
                    })
                    setErrors(null)
                    setResult("Image uploded successfully!")
                    setBar(<Progress color="green" file={image[0].name} progress={100} />)
                } else {
                    setResult(null)
                    setErrors("An error found!");
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Heading name='Add Course' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={SendData} className="login">
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <h2>Add Course</h2>
                                <div className="row">
                                    <Input handleChange={valus} value={first.name} nme='name' typ='text' holder='Course Name' />
                                    <Input handleChange={valus} value={first.link} nme='link' typ='text' holder='Course link' />
                                    <Input handleChange={valus} nme='desc' value={first.desc} typ='text' holder='Description' />
                                    <Input handleChange={(e) => setImage(e.target.files)} nme='image' typ='file' holder='file' />
                                    <button type='submit' className='btn w-100'>Add Course</button>
                                </div>
                                {bar}
                                <p className='forgot'>Add Video: <Link to={'/add-video-for-view'}>click here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddCourse
