import { Component, OnInit } from '@angular/core';
import { PokemonDetailService } from './../../services/pokemon-detail.service';

@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  public pokemonToView: Object;

  constructor(private details: PokemonDetailService) {
    this.details.receivedPokemon$.subscribe(data => {
      this.details.getPokemonById(data.id).subscribe(pokemon => {
        this.pokemonToView = pokemon;
        this.details.getPokemonImg(this.pokemonToView['img']).subscribe(img => {
          
        })
      })
    })
  }

  ngOnInit() {
  }


}
