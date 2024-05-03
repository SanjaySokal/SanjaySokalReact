import React from 'react';

interface data {
    name: string;
}

const Heading = (props: data) => {
    return (
        <div className="page-heading">
            <div className="container">
                <h1>{props.name}</h1>
            </div>
        </div>
    )
}

export default Heading