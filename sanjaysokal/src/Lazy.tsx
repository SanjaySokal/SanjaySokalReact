import React from 'react'
import lazy from './images/lazy.gif';

const Lazy: React.FC = () => {
    return (
        <div className='lazy-loading'>
            <img src={lazy} alt='Loading...' className='lazy' title='Loading...' />
        </div>
    )
}

export default Lazy