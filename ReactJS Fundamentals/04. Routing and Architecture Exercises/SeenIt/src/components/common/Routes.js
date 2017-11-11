import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Submit from './../posts/Submit';
import Catalog from './../posts/Catalog';
import MyPosts from './../posts/MyPosts';
import EditPost from './../posts/EditPost';
import DeletePost from './../posts/DeletePost';
import Details from './../posts/Details';
import DeleteCommentPost from './../comments/DeleteCommentPost';
import GuestHome from './../auth/GuestHome';

let Routes = () => (
    <Switch>
        <Route exact path='/' component={Catalog} />
        <Route path='/catalog' component={Catalog} />
        <Route path='/submit' component={Submit} />
        <Route path='/myPosts' component={MyPosts} />
        <Route path='/editPost/:postId' component={EditPost} />
        <Route path='/deletePost/:postId' component={DeletePost} />
        <Route path='/details/:postId' component={Details} />
        <Route path='/deleteComment/:commentId' component={DeleteCommentPost} />
    </Switch>
)

export default Routes;