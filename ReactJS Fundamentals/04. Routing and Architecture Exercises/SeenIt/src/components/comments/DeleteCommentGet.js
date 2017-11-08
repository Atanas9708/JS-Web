import React from 'react';
import { Link } from 'react-router-dom';

let DeleteCommentGet = (props) => {
    let commentId = props.id;
    return (
       <Link to={`/deleteComment/${commentId}`} className="deleteLink"> delete</Link>
    )
}

export default DeleteCommentGet;