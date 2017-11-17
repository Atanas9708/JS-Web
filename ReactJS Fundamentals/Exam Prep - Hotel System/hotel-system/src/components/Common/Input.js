import React, { Component } from 'react';

class Input extends Component {
    render() {

        const {name, type = "text", label, value, onChange} = this.props;

        return (
            <div>
                <label htmlFor="new-email">{label}</label>
                <input 
                onChange={onChange}
                name={name}
                type={type}
                id={name}
                value={value}
                />
            </div>
        )
    }
}

export default Input;