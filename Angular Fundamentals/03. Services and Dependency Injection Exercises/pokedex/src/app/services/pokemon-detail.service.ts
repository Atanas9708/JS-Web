import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

const url = 'http://localhost:5000';

@Injectable()
export class PokemonDetailService {

    private targetedPokemon = new Subject<any>();

    receivedPokemon$ = this.targetedPokemon.asObservable(); 

    constructor(private http: HttpClient) { }

   getPokemonData(data) {
       this.targetedPokemon.next(data);
   }

   getPokemonById(pokemonId) {
       return this.http.get(url + `/pokemon?pokemonId=${pokemonId}`);
   }
}