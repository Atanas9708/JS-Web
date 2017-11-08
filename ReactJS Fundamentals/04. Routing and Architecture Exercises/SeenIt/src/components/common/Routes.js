import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Submit from './../posts/Submit';
import Catalog from './../posts/Catalog';
import MyPosts from './../posts/MyPosts';
import EditPost from './../posts/EditPost';
import DeletePost from './../posts/DeletePost';
import Details from './../posts/Details';
import DeleteCommentPost from './../comments/DeleteCommentPost';

let Routes = () => (
    <Switch>
        <Route exact path='/' component={Catalog} />
        <Route exact path='/catalog' component={Catalog} />
        <Route exact path='/submit' component={Submit} />
        <Route exact path='/myPosts' component={MyPosts} />
        <Route exact path='/editPost/:postId' component={EditPost} />
        <Route exact path='/deletePost/:postId' component={DeletePost} />
        <Route exact path='/details/:postId' component={Details} />
        <Route exact path='/deleteComment/:commentId' component={DeleteCommentPost} />
    </Switch>
)

export default Routes;