import React from 'react';

function makeContact(data, id, clickHandler) {
    return (
        <div className="contact" data-id={id} onClick={() => clickHandler(id)}>
            <span className="avatar small">&#9787;</span>
            <span className="title">{data.firstName} {data.secondName}</span>
        </div>
    )
}

export default makeContact;