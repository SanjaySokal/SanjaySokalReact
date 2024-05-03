import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Heading from './Heading'
import Input from './Input'
import Progress from './Progress';

function onenPopup() {
    var view = document.querySelector(".gallery-show");
    view?.classList.add("d-block")
    document.body.classList.add("hide")
}

function closePop() {
    var view = document.querySelector(".gallery-show");
    view?.classList.remove("d-block")
    document.body.classList.remove("hide")
}

const Profile = () => {
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
    var user_em = js.user_email;
    useEffect(() => {
        if (login !== "login") {
            navigate("/login", { replace: true });
        }
    })
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const [bar, setBar] = useState(<div></div>)
    const [ProfiCont, setProfiCont] = useState<{
        name: string;
        email: string;
        phone: string;
        role: string;
        photo: string;
    }>({
        name: "",
        email: "",
        phone: "",
        role: "",
        photo: ""
    })

    useEffect(() => {
        document.title = "Profile - Sanjay Sokal";
        fetch("https://api.sanjaysokal.com/profile", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email: user_em })
        }).then(res => {
            res.json().then(res => setProfiCont({
                name: res[0].name,
                email: res[0].email,
                phone: res[0].phone,
                role: res[0].role,
                photo: res[0].pic
            }))
        })

    }, [user_em])

    function ChangerUpdate(e: React.ChangeEvent<HTMLInputElement>) {
        setProfiCont({ ...ProfiCont, [e.target.name]: e.target.value })
    }

    const UploadImage = async (e: any) => {
        setResult(null)
        setErrors("wait...")
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        var img_nam = e.target.files[0].name;
        if (!allowedExtensions.exec(img_nam)) {
            setResult(null)
            setErrors("Error in Selecting Image Please Select Again!");
        } else {
            setResult(null)
            setErrors(null)
            var date = new Date();
            var editdate = date.getTime();
            var rand = Math.floor(Math.random() * 100);
            var fila_name = img_nam.replaceAll(" ", "_");
            fila_name = fila_name.replaceAll("-", "_");
            fila_name = fila_name.split(".")[0] + "_" + editdate + rand + "." + fila_name.split(".")[1];

            await axios.put("https://api.sanjaysokal.com/update-pic", { "file_name": fila_name, "file": e.target.files[0], "email": ProfiCont.email }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (data) => {
                    console.log(data.loaded, data.total);
                    var loaded = data.loaded;
                    var total = (data.total === undefined) ? 0 : (data.total);
                    var load = Math.round((loaded / total) * 100)
                    setBar(<Progress color="red" file={img_nam} progress={load} />)
                }
            })
                .then(data => {
                    if (data.data.status === "success") {
                        setResult("Profile picture updated!")
                        setErrors(null)
                        setBar(<Progress color="green" file={img_nam} progress={100} />)
                    } else if (data.data.status === "failed") {
                        setResult(null)
                        setErrors("Failed to update Profile picture")
                    } else {
                        setResult(null)
                        setErrors("An error found!");
                    }
                })
                .catch(err => console.log(err))
        }
    }
    const SubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("https://api.sanjaysokal.com/update-user", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ProfiCont)
        }).then(res => {
            res.text().then(data => {
                if (data === "true") {
                    var view = document.querySelector(".gallery-show");
                    view?.classList.remove("d-block")
                    document.body.classList.remove("hide")
                    alert("Profile Updated!");
                }
            })
        })
    }
    var pic = "";
    if (ProfiCont.photo === "favicon.png") {
        pic = "https://api.sanjaysokal.com/api/profile_pic/sokalsanjay@gmail.com/favicon.png";
    } else {
        pic = `https://api.sanjaysokal.com/api/profile_pic/${ProfiCont.email}/${ProfiCont.photo}`;
    }
    return (
        <>
            <Heading name={`Profile of ${ProfiCont.name}`} />
            <section>
                <div className="container">
                    <div className="profile-page">
                        <div className="image">
                            <Input holder='File' nme='pic' typ='file' value='' handleChange={UploadImage} />
                            <img src={pic} alt="Sanjay Sokal" title='Sanjay Sokal' className='w-100' />
                            <form>
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                {bar}
                            </form>
                        </div>
                        <div className="details-of-profile">
                            <div className="profile-edit-btns">
                                <h2>{ProfiCont.name}</h2>
                                <button onClick={onenPopup} className='btn'>Edit &nbsp;<i className="fa-solid fa-user-pen"></i></button>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><b>Name</b></td>
                                        <td><b>{ProfiCont.name}</b></td>
                                    </tr>
                                    <tr>
                                        <td><b>Email</b></td>
                                        <td><b>{ProfiCont.email}</b></td>
                                    </tr>
                                    <tr>
                                        <td><b>Phone Number</b></td>
                                        <td><b>{ProfiCont.phone}</b></td>
                                    </tr>
                                    <tr>
                                        <td><b>Role</b></td>
                                        <td><b>{ProfiCont.role}</b></td>
                                    </tr>
                                    <tr>
                                        <td><b>Password</b></td>
                                        <td><b><Link to={"/forgot-password"}>Change Password</Link></b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <div className="gallery-show">
                <div className="showing-image">
                    <button onClick={closePop} className="close-galery"><i className="fa-solid fa-xmark"></i></button>
                    <form onSubmit={SubmitForm}>
                        <Input handleChange={ChangerUpdate} nme='name' typ='text' holder='Name' value={ProfiCont.name} />
                        <Input handleChange={ChangerUpdate} nme='email' typ='email' holder='Email' disables={true} value={ProfiCont.email} />
                        <Input nme='phone' handleChange={ChangerUpdate} typ='tel' holder='Phone' value={ProfiCont.phone} />
                        <select onChange={e => setProfiCont({ ...ProfiCont, [e.target.name]: e.target.value })} defaultValue={'DEFAULT'} name="role" id="role">
                            <option value={'DEFAULT'} disabled>Select Your Role in Your Company</option>
                            <option value="PHP Developer">PHP Developer</option>
                            <option value="Java Developer">Java Developer</option>
                            <option value="FullStack Developer">FullStack Developer</option>
                            <option value="Python Developer">Python Developer</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Others">Others</option>
                        </select>
                        <button type='submit' className='btn'>Update Profile</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile