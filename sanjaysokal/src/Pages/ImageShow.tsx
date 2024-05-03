import React from 'react'
import { Link } from 'react-router-dom';

interface images {
    image: string;
    name: string;
    handleClick: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ImageShow = (props: images) => {
    return (
        <div className='col-md-4'>
            <Link to='#' download className="images-gallery">
                <img src={props.image} className="w-100" alt={props.name} title={props.name} onClick={props.handleClick} />
            </Link>
        </div>
    )
}

export default ImageShow