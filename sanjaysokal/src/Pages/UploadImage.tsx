import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import ImageShow from './ImageShow'
import Input from './Input'
import { useNavigate } from "react-router-dom";
import Progress from './Progress'
const UploadImage = () => {
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

    const [fileN, setfileN] = useState<string>("")
    const [file, setfile] = useState<any>(null);
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const [bar, setBar] = useState(<></>)
    interface dtaTyp {
        id: number;
        name: string;
        email: string;
        file: string;
    }
    const [data, setData] = useState<dtaTyp[]>([])

    useEffect(() => {
        if (login !== "login") {
            navigate("/login", { replace: true });
        }
        document.title = "Upload Image - Sanjay Sokal"
        fetch("https://api.sanjaysokal.com/user-images", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email: suer_em })
        }).then(res => {
            res.json().then(dta => setData(dta))
        })
    }, [suer_em, login, navigate])

    const uploadData = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null)
        setErrors("wait...")
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(file.name)) {
            setResult(null)
            setErrors("Error in Selecting Image Please Select Again!");
        } else {
            setResult(null)
            setErrors(null)
            var date = new Date();
            var editdate = date.getTime();
            var rand = Math.floor(Math.random() * 100);
            var fila_name = file.name.replaceAll(" ", "_");
            fila_name = fila_name.replaceAll("-", "_");
            fila_name = fila_name.split(".")[0] + "_" + editdate + rand + "." + fila_name.split(".")[1];

            await axios.post("https://api.sanjaysokal.com/upload-image", { "name": fileN, "file_name": fila_name, "file": file, "email": suer_em }, {
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
                        setfileN("")
                        setfile("")
                        setErrors(null)
                        setResult("Image uploded successfully!")
                        setBar(<Progress color="green" file={file.name} progress={100} />)
                    } else if (data.data.status === "failed") {
                        setResult(null)
                        setErrors("Failed to upload image!")
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
            <Heading name='Upload Images' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form className="upload" onSubmit={uploadData} encType="multipart/form-data">
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <div className="upload-theme">
                                    <i className="fa-solid fa-file-arrow-up"></i>
                                    <p>Select Image File To Upload</p>
                                    <Input handleChange={(e: any) => { setfile(e.target.files[0]) }} nme='image' holder='Upload Image' typ='file' />
                                </div>
                                <Input handleChange={(e) => setfileN(e.target.value)} value={fileN} nme='image_name' holder='Image Name' typ='text' />
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
                        {data && data.map(dta => {
                            return <ImageShow key={dta.id} handleClick={() => console.log("clicked")} image={`https://api.sanjaysokal.com/api/image_upload/${dta.email}/${dta.file}`} name={dta.name} />
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default UploadImage