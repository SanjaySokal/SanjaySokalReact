import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Call from './Call'
import Heading from './Heading'
import Input from './Input'

const Verify = () => {
    useEffect(() => {
        document.title = "Verify Your Email - Sanjay Sokal"
    }, [])
    const { email } = useParams();
    const [val, setVal] = useState("")
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault()

        setResult(null)
        setErrors("wait...")
        await fetch("https://api.sanjaysokal.com/verify-user", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ otp: val, email: email })
        })
            .then(function (res) {
                res.json().then(dat => {
                    if (dat.status === true) {
                        setResult("Email verified please try to login!")
                        setVal("")
                        setErrors(null)
                    } else {
                        setErrors("filed to verify email!");
                        setResult(null);
                    }
                })
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Heading name='Verify Email' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form className="login" onSubmit={handleForgot}>
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <h2>Verify Email</h2>
                                <div className="row">
                                    <Input handleChange={e => setVal(e.target.value)} holder="Enter Your OTP" nme='otp' typ='tel' value={val} />
                                    <button type='submit' className='btn'>Verify Email</button>
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

export default Verify