import React, { useEffect, useState } from 'react';
import Lazy from '../Lazy';
import Heading from './Heading';
import ImageShow from './ImageShow';
import Input from './Input';

function closePop() {
    var view = document.querySelector(".gallery-show");
    view?.classList.remove("d-block")
    document.body.classList.remove("hide")
}

interface dtaTyp {
    id: number;
    email: string;
    name: string;
    file: string;
}

const ImagePage = () => {
    const [data, setData] = useState<dtaTyp[]>([])
    const [imgs, setImgs] = useState("");
    const [search, setSearch] = useState("");
    const [view, setView] = useState<JSX.Element[] | JSX.Element>(<Lazy />)
    useEffect(() => {
        fetch("https://api.sanjaysokal.com/images").then(res => res.json()).then(dta => {
            setData(dta)
        })
    }, [])

    useEffect(() => {
        document.title = "Images - Sanjay Sokal";
        setView(
            data.map(data2 => {
                return <ImageShow key={data2.id} image={`https://api.sanjaysokal.com/api/image_upload/${data2.email}/${data2.file}`} handleClick={(e) => {
                    setImgs(e.currentTarget.src)
                    var view = document.querySelector(".gallery-show")
                    view?.classList.add("d-block")
                    document.body.classList.add("hide")
                }} name={data2.name} />
            })
        )
    }, [data])

    const searchImage = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch("https://api.sanjaysokal.com/search-images", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ search: search })
        }).then(res => {
            res.json().then(res => {
                setData(res);
                // setView(
                //     data.map(dat => {
                //         return <ImageShow key={dat.id} image={`https://api.sanjaysokal.com/api/image_upload/${dat.email}/${dat.file}`} handleClick={(e) => {
                //             setImgs(e.currentTarget.src)
                //             var view = document.querySelector(".gallery-show")
                //             view?.classList.add("d-block")
                //             document.body.classList.add("hide")
                //         }} name={dat.name} />
                //     }))
            })
        })
    }

    return (
        <>
            <Heading name='Free Images - Sanjay Sokal' />
            <section>
                <h2 className="section-heading">Free Images</h2>
                <form className='search-form' onSubmit={searchImage}>
                    <Input handleChange={e => setSearch(e.target.value)} holder="Type image Name Here" nme='search' typ='search' value={search} />
                    <button type='submit' className='btn'>Search</button>
                </form>
                <div className="container">
                    <div className="row">
                        {view}
                    </div>
                </div>
            </section>

            <div className="gallery-show">
                <div className="showing-image">
                    <button onClick={closePop} className="close-galery"><i className="fa-solid fa-xmark"></i></button>
                    <img src={imgs} alt="Sanjay Sokal" />
                </div>
            </div>
        </>
    )
}

export default ImagePage