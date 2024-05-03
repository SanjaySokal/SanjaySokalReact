import React, { useEffect, useState } from 'react'
import Call from './Call'
import Heading from './Heading'
import Input from './Input'

const Forgot = () => {
    useEffect(() => {
        document.title = "Forgot Password - Sanjay Sokal"
    }, [])
    const [val, setVal] = useState("")
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault()
        setResult(null)
        setErrors("wait...")
        await fetch("https://api.sanjaysokal.com/forgot", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ email: val })
        })
            .then(function (res) {
                res.text().then(data => {
                    if (data === "1") {
                        setResult("Please check your email to forgot password!")
                        setVal("")
                        setErrors(null)
                    } else {
                        setErrors("filed to forgot password!");
                        setResult(null);
                    }
                })
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Heading name='Forgot Password' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form className="login" onSubmit={handleForgot}>
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <h2>Forgot Password</h2>
                                <div className="row">
                                    <Input handleChange={e => setVal(e.target.value)} holder="Enter Your Email" nme='email' typ='email' value={val} />
                                    <button type='submit' className='btn'>Forgot Password</button>
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

export default Forgot