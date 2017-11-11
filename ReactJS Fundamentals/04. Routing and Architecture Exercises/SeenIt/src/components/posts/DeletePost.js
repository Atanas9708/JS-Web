import React from 'react';
import { Redirect } from 'react-router-dom';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';

let DeletePost = (props) => {
    let postId = props.match.params.postId;
    
    reqHandler.deletePost(postId)
    .then(() => {
        notifiy.showInfo('Post deleted!');
    })

    return (
        <Redirect to ='/'/>
    )
}

export default DeletePost;