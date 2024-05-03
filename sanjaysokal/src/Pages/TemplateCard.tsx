import React from 'react'
import { Link } from 'react-router-dom'

interface props {
    id: number;
    image: string;
    nameWeb: string;
}

const TemplateCard = (props: props) => {
    return (
        <>
            <div className="col-md-4">
                <div className="web">
                    <Link to={`/web-templates/view/${props.id}`} className="website-image">
                        <img src={props.image} className="w-100" alt={props.nameWeb} title={props.nameWeb} />
                    </Link>
                    <p>{props.nameWeb}</p>
                </div>
            </div>
        </>
    )
}

export default TemplateCard