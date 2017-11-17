import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Submit from './../posts/Submit';
import Catalog from './../posts/Catalog';
import MyPosts from './../posts/MyPosts';
import EditPost from './../posts/EditPost';
import Details from './../posts/Details';


let Routes = () => (
    <Switch>
        <Route exact path='/' component={Catalog} />
        <Route path='/catalog' component={Catalog} />
        <Route path='/submit' component={Submit} />
        <Route path='/myPosts' component={MyPosts} />
        <Route path='/editPost/:postId' component={EditPost} />
        <Route path='/details/:postId' component={Details} />
    </Switch>
)

export default Routes;