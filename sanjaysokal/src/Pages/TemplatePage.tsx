import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import TemplateCard from './TemplateCard';
import Call from './Call';
import Input from './Input';
import Lazy from '../Lazy';

function TemplatePage() {
    const [search, setSearch] = useState("");
    interface tyData {
        name: string;
        email: string;
        image: string;
        id: number
    }
    const [temp, setTemp] = useState<tyData[]>([])
    const [view, setView] = useState<JSX.Element[] | JSX.Element>(<Lazy />)

    useEffect(() => {
        fetch("https://api.sanjaysokal.com/web").then(res => res.json()).then(data => {
            setTemp(data)
            console.log(data);
        })
    }, [])

    useEffect(() => {
        document.title = "Templates - Sanjay Sokal"
        setView(
            temp.map(data => {
                return <TemplateCard key={data.id} id={data.id} nameWeb={data.name} image={`https://api.sanjaysokal.com/api/websites/${data.email}/${data.image}`} />
            })
        )
    }, [temp])

    const searchImage = async (e: React.FormEvent) => {
        e.preventDefault()
        await fetch("https://api.sanjaysokal.com/search-web", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ search: search })
        }).then(res => {
            res.json().then(res => setTemp(res))
        })
    }

    return (
        <>
            <Heading name="Web Templates - Sanjay Sokal" />
            <section>
                <h2 className="section-heading">Free Web Templates</h2>
                <form className='search-form' onSubmit={searchImage}>
                    <Input handleChange={e => setSearch(e.target.value)} holder="Type Template/Website Name Here" nme='search' typ='search' value={search} />
                    <button type='submit' className='btn'>Search</button>
                </form>
                <div className="container">
                    <div className="row">
                        {view}
                    </div>
                </div>
            </section>
            <Call />
        </>
    )
}

export default TemplatePage