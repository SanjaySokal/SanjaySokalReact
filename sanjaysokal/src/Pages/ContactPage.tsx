import React, { useEffect, useState } from 'react'
import Call from './Call'
import Heading from './Heading'
import Input from './Input'

const ContactPage = () => {
    useEffect(() => {
        document.title = "Contact - Sanjay Sokal"
    }, [])
    const [result, setResult] = useState<null | string>(null);
    const [Data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    function handleData(e: React.ChangeEvent<HTMLInputElement>) {
        setData({ ...Data, [e.target.name]: e.target.value })
    }
    const sendData = async (e: React.FormEvent) => {
        e.preventDefault()
        setResult("wait...")
        await fetch("https://api.sanjaysokal.com/contact", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(Data)
        })
            .then(data => data.json())
            .then(function (res) {
                if (res) {
                    setData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: ""
                    })
                    setResult("Thanks for Message. We will contact you soon!");
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Heading name='Contact Me' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <iframe title="Sanjay Sokal" className='shadow' style={{ border: 'none' }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.1932492867913!2d76.1013114143557!3d28.201440710212918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3912b9fa4e561b21%3A0x5f8fa2b23697d4b8!2sSanjay%20Sokal!5e0!3m2!1sen!2sin!4v1665749382774!5m2!1sen!2sin" width="100%" height="350px"></iframe>
                        </div>
                        <div className="col-md-6">
                            <h2 style={{ marginBottom: '15px' }}>Contact Me</h2>
                            <form className='row' autoComplete='off' onSubmit={sendData}>
                                {result ? <div className="result">{result}</div> : null}
                                <div className="col-md-6">
                                    <Input handleChange={handleData} value={Data.name} nme='name' typ='text' holder='Enter Name' />
                                </div>
                                <div className="col-md-6">
                                    <Input handleChange={handleData} value={Data.email} nme='email' typ='email' holder='Enter Email' />
                                </div>
                                <div className="col-md-6">
                                    <Input handleChange={handleData} value={Data.phone} nme='phone' typ='tel' holder='Enter Phone' />
                                </div>
                                <div className="col-md-6">
                                    <Input handleChange={handleData} value={Data.subject} nme='subject' typ='text' holder='Subject' />
                                </div>
                                <div className="col-md-12">
                                    <Input handleChange={handleData} value={Data.message} nme='message' typ='text' holder='Message' />
                                </div>
                                <div className="col-md-6">
                                    <button type='submit' className='btn w-100'>Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-contact">
                                <div className="icon">
                                    <i className="fa-solid fa-headset"></i>
                                    <a href="tel:+91-82-95-67-3601">+91-82-95-67-3601</a>
                                </div>
                                <div className="icon">
                                    <i className="fa-solid fa-inbox"></i>
                                    <a href="mailto:contact@sanjaysokal.com">contact@sanjaysokal.com</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="footer-contact">
                                <div className="icon">
                                    <i className="fa-solid fa-map"></i>
                                    <a href="https://goo.gl/maps/GGy4k1Cf3bQ9kHRaA" rel="noreferrer" target={'_blank'}>
                                        Sanjay Sokal, Khairoli, Haryana 123028
                                    </a>
                                </div>
                                <div className="icon">
                                    <a href="https://www.youtube.com/@sokalhtml" rel="noreferrer" target={'_blank'}>
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                    <a href="https://www.facebook.com/sanjay.sokal.9/" rel="noreferrer" target={'_blank'}>
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a href="https://instagram.com/sanjay.sokal/" rel="noreferrer" target={'_blank'}>
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="https://twitter.com/SanjaySokal6" rel="noreferrer" target={'_blank'}>
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/in/sanjaysokal/" rel="noreferrer" target={'_blank'}>
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Call />
        </>
    )
}

export default ContactPage