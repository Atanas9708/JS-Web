import React from 'react';

let Image = (props) => {
    return (
        <img className='char-img' alt='img' src={props.url} />
    )
}

export default Image;