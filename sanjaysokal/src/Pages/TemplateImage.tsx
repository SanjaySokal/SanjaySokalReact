import React from 'react'

interface types {
    name: string;
    image: string
}

const TemplateImage = (props: types) => {
    return <img src={props.image} className="w-100" alt={props.name} title={props.name} style={{ marginTop: '25px'}} />
}

export default TemplateImage