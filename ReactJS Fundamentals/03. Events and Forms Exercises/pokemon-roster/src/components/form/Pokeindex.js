import React, { Component } from 'react';
import PokemonField from './formFields/PokemonField';
import Input from './../form/formFields/Input';

class Pokeindex extends Component {
    constructor() {
        super()

        this.state = {
            pokemonName: '',
            pokemonImage: '',
            pokemonInfo: '',
            pokemons: []
        }
    }

    submitPokemon(e) {
        e.preventDefault();
        let payload = {
            pokemonName: this.state.pokemonName,
            pokemonImage: this.state.pokemonImage,
            pokemonInfo: this.state.pokemonInfo
        }

        this.createPokemon(payload);
    }

    createPokemon(payload) {
        fetch('http://localhost:5000/pokedex/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                return res.json()
            })
            .then(d => {
                console.log(d);
            })
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({ pokemons: data.pokemonColection });
            })
    }

    render() {
        let validName = this.state.pokemonName !== '';
        let validImage = this.state.pokemonImage.startsWith('http');
        let validInfo = this.state.pokemonInfo.length > 3 && this.state.pokemonInfo.length < 150;
        return (
            <div>
                <form onSubmit={this.submitPokemon.bind(this)}>
                    <fieldset className='App'>
                        <Input
                            type='text'
                            data='pokemonName'
                            name='Pokemon Name'
                            func={e => {
                                this.setState({ pokemonName: e.target.value })
                            }}
                            valid={validName}
                        />

                        <Input
                            type='text'
                            data='pokemonImage'
                            name='Pokemon Image'
                            func={e => {
                                this.setState({ pokemonImage: e.target.value })
                            }}
                            valid={validImage}
                        />

                        <Input
                            type='text'
                            data='pokemonInfo'
                            name='Pokemon Info'
                            func={e => {
                                this.setState({ pokemonInfo: e.target.value })
                            }}
                            valid={validInfo}
                        />

                        <input
                            style={({ "display": (validName && validImage && validInfo) ? '' : 'none' })}
                            type='submit'
                            value='Create Pokemon'
                        />
                    </fieldset>
                </form>
                <div style={{ display: 'inline-block' }}>
                    {this.state.pokemons.map((p, i) => {
                        return <PokemonField  key={i} data={p}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Pokeindex;