import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Call from './Call'
import Heading from './Heading'
import Input from './Input'

const ResetPage = () => {
    useEffect(() => {
        document.title = "Password Reset - Sanjay Sokal"
    }, [])
    const { email } = useParams();
    const [val, setVal] = useState({
        otp: "",
        pass: "",
        con_pass: ""
    })
    const [result, setResult] = useState<null | string>(null);
    const [errors, setErrors] = useState<null | string>(null);
    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors("wait...")
        setResult(null)
        if (val.pass === val.con_pass) {
            await fetch("https://api.sanjaysokal.com/check-otp", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ email: email, otp: val.otp, pass: val.pass })
            })
                .then((res) => {
                    res.json().then(data => {
                        console.log(data);

                        if (data.status === false) {
                            setErrors("something went wrong! please check otp")
                            setResult(null)
                        }
                        else if (data.status === true) {
                            setResult("Success");
                            setVal({
                                con_pass: "",
                                otp: "",
                                pass: ""
                            })
                            setErrors(null)
                        } else {
                            setErrors("Server is not Working! Please Try Again.")
                        }
                    })
                })
                .catch(err => console.log(err))
        } else {
            setErrors("Please enter same password!")
        }
    }
    function ChangeVal(e: React.ChangeEvent<HTMLInputElement>) {
        var nam = e.target.name;
        var dat = e.target.value;
        setVal({ ...val, [nam]: dat })
    }
    return (
        <div>
            <Heading name='Change Password' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <form className="login" onSubmit={handleForgot}>
                                {result ? <div className="result">{result}</div> : null}
                                {errors ? <div className="errors">{errors}</div> : null}
                                <h2>Change Password</h2>
                                <div className="row">
                                    <Input handleChange={ChangeVal} holder="Enter OTP" nme='otp' typ='tel' value={val.otp} />
                                    <Input handleChange={ChangeVal} holder="Enter New Password" nme='pass' typ='password' value={val.pass} />
                                    <Input handleChange={ChangeVal} holder="Enter New Password Again" nme='con_pass' typ='password' value={val.con_pass} />
                                    <button type='submit' className='btn'>Change Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Call />
        </div>
    )
}

export default ResetPage
