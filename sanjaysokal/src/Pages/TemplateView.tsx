import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Heading from './Heading'
import TemplateImage from './TemplateImage';
import Call from './Call';
import Lazy from '../Lazy';

function TemplateView() {
    const navigate = useNavigate();
    const [view, setView] = useState<JSX.Element>(<Lazy />)
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
    var login = js.loggedin
    useEffect(() => {
        document.title = "Template View - Sanjay Sokal"
        if (login !== "login") {
            navigate("/login", { replace: true });
        }
    })
    const [data, setData] = useState({
        name: "",
        email: "",
        image: "",
        file: ""
    })
    const { id } = useParams();
    fetch("https://api.sanjaysokal.com/web-view", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ id: id })
    }).then(res => res.json()).then(dat => {
        setData({ name: dat[0].name, image: dat[0].image, email: dat[0].email, file: dat[0].website })
        setView(<section>
            <div className="text-center">
                <a href={`https://api.sanjaysokal.com/api/websites/${data.email}/${data.file}`} download={"doanload"} className="btn">Download Now</a>
            </div>
            <TemplateImage name={data.name} image={`https://api.sanjaysokal.com/api/websites/${data.email}/${data.image}`} />
        </section>)
    })
    return (
        <>
            <Heading name={data.name} />
            {view}
            <Call />
        </>
    )
}

export default TemplateView