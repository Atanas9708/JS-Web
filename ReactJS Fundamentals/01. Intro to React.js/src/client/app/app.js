import React from 'react';
import './app/css';
import makeContact from './contact';
import contacts from '../contacts.json';

function makeApp(clickHandler, id) {
    const currentUser = contacts[id];

    return (
        <div className="container">
            <header>&#9993; Contact Book</header>
            <div id="book">
                <div id="list">
                    <h1>Contacts</h1>
                    <div className="content">
                        {contacts.map((c, i) => makeContact(c, i, clickHandler))}
                    </div>
                </div>
                <div id="details">
                    <h1>Details</h1>
                    <div className="content">
                        <div className="info">
                            <div className="col">
                                <span className="avatar">&#9787;</span>
                            </div>
                            <div className="col">
                                <span className="name">{currentUser.firstName}</span>
                                <span className="name">{currentUser.secondName}</span>
                            </div>
                        </div>
                        <div className="info">
                            <span className="info-line">&phone; {currentUser.phone}</span>
                            <span className="info-line">&#9993; {currentUser.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <footer>Contact Book SPA &copy; 2017</footer>
        </div>
    )
}

export default makeApp;