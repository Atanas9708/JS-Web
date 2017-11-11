import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';
import notifiy from './../../notifications/notify';
import { Redirect } from 'react-router-dom';

class Submit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fireRedirect: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createPost = (e) => {
        e.preventDefault();
        if (this.state === null) {
            notifiy.showError('Please fill all the required fields');
            return;
        }
        let payload = {
            author: localStorage.getItem('username'),
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            imageUrl: this.state.image
        }

        reqHandler.createPost(payload)
            .then(response => {
                this.setState({fireRedirect: true})
                notifiy.showInfo('Post created!');
                //window.location.replace('/catalog');
            })
    }

    render() {
        const { fireRedirect } = this.state;
        return (
            <div>
                <section id="viewSubmit">
                    <div className="submitArea">
                        <h1>Submit Link</h1>
                        <p>Please, fill out the form. A thumbnail image is not required.</p>
                    </div>
                    <div className="submitArea formContainer">
                        <form id="submitForm" className="submitForm" onSubmit={this.createPost}>
                            <label>Link URL:</label>
                            <input onChange={this.onChange} name="url" type="text" />
                            <label>Link Title:</label>
                            <input onChange={this.onChange} name="title" type="text" />
                            <label>Link Thumbnail Image (optional):</label>
                            <input onChange={this.onChange} name="image" type="text" />
                            <label>Description (optional):</label>
                            <textarea onChange={this.onChange} name="description"></textarea>
                            <input id="btnSubmitPost" value="Submit" type="submit" />
                        </form>
                    </div>
                </section>
                {fireRedirect && (
                    <Redirect to='/' />
                )}
            </div>
        )
    }
}

export default Submit;
