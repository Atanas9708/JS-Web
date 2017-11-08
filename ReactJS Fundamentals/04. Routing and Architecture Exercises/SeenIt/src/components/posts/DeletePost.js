import React from 'react';
import { Redirect } from 'react-router-dom';
import reqHandler from './../../utils/reqHandler';

let DeletePost = (props) => {
    let postId = props.match.params.postId;
    
    reqHandler.deletePost(postId);

    return (
        <Redirect to ='/catalog'/>
    )
}

export default DeletePost;