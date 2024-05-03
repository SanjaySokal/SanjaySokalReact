import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Call from './Call';
import Heading from './Heading'
import Input from './Input'

const RegisterPage = () => {
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
    useEffect(() => {
        document.title = "Register - Sanjay Sokal"
        if (login === "login") {
            navigate("/", { replace: true });
        }
    })
    const [result, setResult] = useState<null | string>(null);
    const [btn, setbtn] = useState<boolean>(false);
    const [errors, setErrors] = useState<null | string>(null);
    const [first, setfirst] = useState<{
        name: string;
        email: string;
        phone: string;
        password: string;
        con_password: string;
    }>({
        name: "",
        email: "",
        phone: "",
        password: "",
        con_password: ""
    })

    function valus(e: React.ChangeEvent<HTMLInputElement>) {
        var nam = e.target.name;
        var dat = e.target.value;
        setfirst({ ...first, [nam]: dat })
    }

    const SendData = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);
        setErrors("wait...");
        setbtn(true);
        if (first.password === first.con_password) {
            await fetch("https://api.sanjaysokal.com/add-user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(first)
            })
                .then((res) => {
                    res.json().then(data => {
                        if (data.status === "false") {
                            setErrors(data.result)
                            setResult(null)
                            setbtn(false);
                        }
                        else if (data.status === "true") {
                            setfirst({
                                name: "",
                                email: "",
                                phone: "",
                                con_password: "",
                                password: ""
                            })
                            setResult(data.result);
                            setErrors(null)
                            setbtn(false);
                        } else {
                            setErrors("Server is not Working! Please Try Again.")
                            setbtn(false);
                        }
                    })
                })
                .catch(err => console.log(err))
        } else {
            setErrors("Password Not Same!")
        }
    }

    return (
        <>
            <Heading name='Register' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={SendData} className="login">
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <h2>Register Here</h2>
                                <p style={{ color: 'red' }}>*Remember you have to verify your email after registration.</p>
                                <div className="row">
                                    <Input handleChange={valus} value={first.name} nme='name' typ='text' holder='Name' />
                                    <Input handleChange={valus} value={first.email} nme='email' typ='email' holder='Email' />
                                    <Input handleChange={valus} value={first.phone} nme='phone' typ='tel' holder='Phone' />
                                    <Input handleChange={valus} value={first.password} nme='password' typ='password' holder='Password' />
                                    <Input handleChange={valus} value={first.con_password} nme='con_password' typ='password' holder='Confirm Password' />
                                    <button disabled={btn} type='submit' className='btn w-100'>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Call />
        </>
    )
}

export default RegisterPage