import React, { Component } from 'react';
import reqHandler from './../../utils/reqHandler';

class Submit  extends Component {

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    createPost = (e) => {
        e.preventDefault();
        let payload = {
            author: localStorage.getItem('username'),
            title: this.state.title,
            description: this.state.description,
            url: this.state.url,
            imageUrl: this.state.image
        }
        reqHandler.createPost(payload)
        .then(response => {
            console.log(response);
        })
    }

    render() {
        return (
            <section id="viewSubmit">
            <div className="submitArea">
                <h1>Submit Link</h1>
                <p>Please, fill out the form. A thumbnail image is not required.</p>
            </div>
            <div className="submitArea formContainer">
                <form id="submitForm" className="submitForm" onSubmit={this.createPost}>
                    <label>Link URL:</label>
                    <input onChange={this.onChange} name="url" type="text"/>
                    <label>Link Title:</label>
                    <input onChange={this.onChange} name="title" type="text"/>
                    <label>Link Thumbnail Image (optional):</label>
                    <input onChange={this.onChange} name="image" type="text"/>
                    <label>Description (optional):</label>
                    <textarea onChange={this.onChange} name="description"></textarea>
                    <input  id="btnSubmitPost" value="Submit" type="submit"/>
                </form>
            </div>
        </section>
        )
    }
}

export default Submit;
