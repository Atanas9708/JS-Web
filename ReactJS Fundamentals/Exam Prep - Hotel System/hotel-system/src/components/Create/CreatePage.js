import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { createHotel } from './../../api/remote';
import Input from './../Common/Input';

class CreatePage extends Component {
    constructor(props) {
        super(props);


        this.state = {
            name: '',
            location: '',
            description: '',
            numberOfRooms: '',
            image: '',
            parkingSlots: '',
            error: false,
            submiting: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ submiting: true });
        const hotel = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            numberOfRooms: Number(this.state.numberOfRooms),
            image: this.state.image,
            parkingSlots: Number(this.state.parkingSlots)
        }
        const error = { message: '', errors: {} };
        if (hotel.name === '' || hotel.location === '' || hotel.image === '') {
            error.message = "Check the form for errors";
            error.errors.validateFields = "Fields must not be empty!";
        }
        if (hotel.description.length < 10) {
            error.message = "Check the form for errors";
            error.errors.description = "Description must be more than 10 symbols";
        }
        if (isNaN(hotel.numberOfRooms) || hotel.numberOfRooms <= 0) {
            error.message = "Check the form for errors";
            error.errors.numberOfRooms = "Number of Rooms must be a positive number";
        }
        if (error.message) {
            this.setState({ error, submiting: false });
            return;
        }

        createHotel(hotel)
            .then(res => {
                if (!res.success) {
                    this.setState({ error: res, submiting: false });
                    return;
                }
                console.log(res);
            })

        this.setState({ submiting: false });
        this.props.history.push("/");
    }

    render() {
        let errors = null;
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {Object.keys(this.state.error.errors).map(e => {
                        return <p key={e}>{this.state.error.errors[e]}</p>
                    })}
                </div>
            );
        }

        return (
            <div>
                <h1>Create Hotel</h1>
                {errors}
                <form onSubmit={this.onSubmit}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        label="Name"
                    />
                    <Input
                        name="location"
                        value={this.state.location}
                        onChange={this.onChange}
                        label="Location"
                    />
                    <Input
                        name="description"
                        value={this.state.description}
                        onChange={this.onChange}
                        label="Description"
                    />
                    <Input
                        name="numberOfRooms"
                        type="number"
                        value={this.state.numberOfRooms}
                        onChange={this.onChange}
                        label="Number of Rooms"
                    />
                    <Input
                        name="image"
                        value={this.state.image}
                        onChange={this.onChange}
                        label="Image"
                    />
                    <Input
                        name="parkingSlots"
                        type="number"
                        value={this.state.parkingSlots}
                        onChange={this.onChange}
                        label="Parking Slots"
                    />
                     <input type="submit" value="Create" disabled={this.state.submitting}/>
                </form>
            </div>
        )
    }
}

export default withRouter(CreatePage);