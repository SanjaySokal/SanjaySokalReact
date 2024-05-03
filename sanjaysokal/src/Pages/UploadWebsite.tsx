import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from './Heading'
import Input from './Input'
import Progress from './Progress'
import TemplateCard from './TemplateCard'

const UploadWebsite = () => {
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const [fileN, setfileN] = useState("")
    const [bar, setBar] = useState(<></>)
    const [file, setfile] = useState<{ image: any; file: any }>({ image: null, file: null });
    interface types {
        name: string
        image: string
        id: number
        email: string
    }
    const [dta, setDat] = useState<types[]>([])
    const navigate = useNavigate();
    var a = document.cookie.split(';')
    var js: { loggedin: string | undefined; user_email: string | undefined; } = { loggedin: "", user_email: "" };
    a.map(data => {
        var val_a;
        var val_b;
        var a = data.split("=")[0].replace(" ", "");
        var b = data.split("=")[1];
        if (a === "login") {
            val_a = a;
            val_b = b;
            js = { loggedin: val_a, user_email: val_b }
        }
        return js;
    })
    var login = js.loggedin;
    var suer_em = js.user_email;
    useEffect(() => {
        document.title = "Upload Website Template - Sanjay Sokal"
        if (login !== "login") { navigate("/login", { replace: true }) }
    }, [login, navigate])

    useEffect(() => {
        document.title = "Upload Website - Sanjay Sokal"
        fetch("https://api.sanjaysokal.com/user-website", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email: suer_em })
        }).then(res => { res.json().then(dta => setDat(dta)) })
    }, [suer_em])

    function handleFile(e: any) { var name = e.currentTarget.name; var val = e.currentTarget.files[0]; setfile({ ...file, [name]: val }) }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setResult(null)
        setErrors("wait...")
        var date = new Date();
        var editdate = date.getTime();
        var rand = Math.floor(Math.random() * 100);
        var fila_name = file.image.name.replaceAll(" ", "_");
        fila_name = fila_name.replaceAll("-", "_");
        fila_name = fila_name.split(".")[0] + "_" + editdate + rand + "." + fila_name.split(".")[1];

        var zip_name = file.file.name.replaceAll(" ", "_");
        zip_name = zip_name.replaceAll("-", "_");
        zip_name = zip_name.split(".")[0] + "_" + editdate + rand + "." + zip_name.split(".")[1];
        var imagext = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        var zipext = /(\.zip|\.rar)$/i;

        if (!imagext.exec(fila_name)) {
            setResult(null)
            setErrors("please select image format eg. .jpg, .jpeg, .png, gif")
        } else if (!zipext.exec(zip_name)) {
            setResult(null)
            setErrors("please select zip-file format eg. .rar, .zip")
        } else {
            axios.post("https://api.sanjaysokal.com/upload-website", { name: fileN, image: file.image, file_name: fila_name, zip: file.file, zip_name: zip_name, email: suer_em }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (data) => {
                    console.log(data.loaded, data.total);
                    var loaded = data.loaded;
                    var total = (data.total === undefined) ? 0 : (data.total);
                    var load = Math.round((loaded / total) * 100)
                    setBar(<Progress color="red" file={file.file.name} progress={load} />)
                }
            }).then(data => {
                if (data.data.status === "success") {
                    setErrors(null)
                    setfileN("")
                    setResult("Uploading Success!")
                    setBar(<Progress color="green" file={file.file.name} progress={100} />)
                } else if (data.data.status === "failed") {
                    setResult(null)
                    setErrors("failed to upload!")
                } else {
                    setResult(null)
                    setErrors("some error found!")
                }
            })
        }
    }
    return (
        <>
            <Heading name='Upload Website' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit} className="upload">
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <div className="upload-theme">
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                    <p>Select Website Screenshot</p>
                                    <Input handleChange={handleFile} nme='image' holder='Upload Image' typ='file' />
                                </div>
                                <div className="upload-theme">
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                    <p>Select Website Zip File</p>
                                    <Input handleChange={handleFile} nme='file' holder='Upload Image' typ='file' />
                                </div>
                                <Input value={fileN} handleChange={(e) => { setfileN(e.target.value) }} nme='web_name' holder='Website Name' typ='text' />
                                {bar}
                                <button type="submit" className='btn'>Upload Image</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        {dta && dta.map(data => {
                            return <TemplateCard key={data.id} id={data.id} image={`https://api.sanjaysokal.com/api/websites/${data.email}/${data.image}`} nameWeb={data.name} />
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default UploadWebsite