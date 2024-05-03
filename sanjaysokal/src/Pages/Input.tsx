import React from 'react'
interface types {
    typ: string;
    nme: string;
    holder: string;
    disables?: boolean;
    value?: string;
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: types) => {
    return <input type={props.typ} name={props.nme} placeholder={props.holder} required disabled={props.disables} value={props.value} onChange={props.handleChange} />
}

export default Input