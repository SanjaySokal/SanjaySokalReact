import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import image from '../images/work with me.png'
import Input from './Input'
import axios from 'axios'
import Progress from './Progress'

const WorkWithUs = () => {
    useEffect(() => {
        document.title = "Work With Me - Sanjay Sokal"
    }, [])
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const [file, setFile] = useState<any>(null);
    const [bar, setBar] = useState(<></>)
    const [data, setData] = useState<{
        name: string;
        email: string;
        phone: string;
        description: string;
        message: string;
    }>({
        name: "",
        email: "",
        phone: "",
        description: "",
        message: ""
    })

    function handleChange(e: any) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    function fileHandling(e: any) {
        setFile(e.target.files[0])
    }

    const sendData = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null)
        setErrors("wait...")
        var allowedExtensions = /(\.pdf|\.docx|\.doc)$/i;
        if (data.name.trim() === "") {
            setResult(null)
            setErrors("please enter your name!")
        } else if (data.email.trim() === "") {
            setResult(null)
            setErrors("please enter your email!")
        } else if (data.phone.trim() === "") {
            setResult(null)
            setErrors("please enter your phone number!")
        } else if (data.description.trim() === "") {
            setResult(null)
            setErrors("please enter description!")
        } else if (data.message.trim() === "") {
            setResult(null)
            setErrors("please enter any message!")
        } else if (file === null) {
            setResult(null)
            setErrors("upload your resume")
        } else if (!allowedExtensions.exec(file.name)) {
            setResult(null)
            setErrors("please select a pdf or docx or doc file only")
        } else {
            setResult(null)
            setErrors(null)
            var date = new Date();
            var editdate = date.getTime();
            var rand = Math.floor(Math.random() * 100);
            var fila_name = file.name.replaceAll(" ", "_");
            fila_name = fila_name.replaceAll("-", "_");

            fila_name = fila_name.split(".")[0] + "_" + editdate + rand + "." + fila_name.split(".")[1];

            var formData = new FormData();
            formData.append('resume', file);
            formData.append('file_name', fila_name);
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('message', data.message);
            formData.append('description', data.description);

            await axios.post("https://api.sanjaysokal.com/work", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (data) => {
                    console.log(data.loaded, data.total);
                    var loaded = data.loaded;
                    var total = (data.total === undefined) ? 0 : (data.total);
                    var load = Math.round((loaded / total) * 100)
                    setBar(<Progress color="red" file={file.name} progress={load} />)
                }
            })
                .then(data => {
                    if (data.data.status === "success") {
                        setData({
                            name: "",
                            email: "",
                            phone: "",
                            description: "",
                            message: ""
                        })
                        setResult("Success in Sending Resume!")
                        setErrors(null)
                        setBar(<Progress color="green" file={file.name} progress={100} />)
                    } else if (data.data.status === "failed") {
                        setResult(null)
                        setErrors("Failed in Sending Resume!")
                    } else {
                        setResult(null)
                        setErrors("An error found!");
                    }
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <>
            <Heading name='Work With Me' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={image} alt="Work With Sanjay Sokal" className='w-100' />
                        </div>
                        <div className="col-md-6">
                            <h2 style={{ marginBottom: '15px' }}>Wanted to work with me?</h2>
                            <form className='row' autoComplete='off' onSubmit={sendData}>
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <div className="col-md-6">
                                    <Input value={data.name} handleChange={handleChange} nme='name' typ='text' holder='Enter Name' />
                                </div>
                                <div className="col-md-6">
                                    <Input value={data.email} handleChange={handleChange} nme='email' typ='email' holder='Enter Email' />
                                </div>
                                <div className="col-md-6">
                                    <Input value={data.phone} handleChange={handleChange} nme='phone' typ='tel' holder='Enter Phone' />
                                </div>
                                <div className="col-md-6">
                                    <Input value={data.description} handleChange={handleChange} nme='description' typ='text' holder='Job Description' />
                                </div>
                                <div className="col-md-6">
                                    <Input handleChange={fileHandling} nme='resume' typ='file' holder='Resume' />
                                </div>
                                <div className="col-md-6">
                                    <Input value={data.message} handleChange={handleChange} nme='message' typ='text' holder='About You...' />
                                </div>
                                {bar}
                                <div className="col-md-6">
                                    <button type='submit' className='btn w-100'>Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WorkWithUs