import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Call from './Call';
import Heading from './Heading'
import Input from './Input'

const LoginPage = () => {
  const navigate = useNavigate();
  var login = "";
  var a = document.cookie.split(';')
  var js = { loggedin: "" };
  a.map(data => {
    var val_a;
    var a = data.split("=")[0].replace(" ", "");
    if (a === "login") {
      val_a = a;
      js = { loggedin: val_a }
    }
    return js;
  })
  login = js.loggedin;

  useEffect(() => {
    document.title = "Login - Sanjay Sokal"
    if (login === "login") {
      navigate("/", { replace: true });
    }
  })
  const [result, setResult] = useState<null | string>(null);
  const [errors, setErrors] = useState<null | string>(null);
  const [first, setfirst] = useState({
    email: "",
    password: ""
  })

  function setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function valus(e: React.ChangeEvent<HTMLInputElement>) {
    var nam = e.target.name;
    var dat = e.target.value;
    setfirst({ ...first, [nam]: dat })
  }

  const SendData = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null)
    setErrors("wait...")
    await fetch("https://api.sanjaysokal.com/check-user", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(first)
    })
      .then(function (res) {
        res.text().then(data => {
          if (data === "1") {
            setCookie("login", first.email, 15);
            window.location.reload();
          } else {
            setErrors("User OR Password Incorrect OR verify your email");
            setResult(null);
          }
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Heading name='Login' />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={SendData} className="login">
                {result ? <div className="result">{result}</div> : null}
                {errors ? <div className="errors">{errors}</div> : null}
                <h2>Login Here</h2>
                <div className="row">
                  <Input handleChange={valus} value={first.email} nme='email' typ='email' holder='Email' />
                  <Input handleChange={valus} nme='password' value={first.password} typ='password' holder='Password' />
                  <button type='submit' className='btn w-100'>Login</button>
                </div>
                <p className='forgot'>Forgot password: <Link to={'/forgot-password'}>click here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Call />
    </>
  )
}

export default LoginPage