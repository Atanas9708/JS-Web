import { Component, OnInit, Input } from '@angular/core';
import { PokemonDetailService } from './../../services/pokemon-detail.service';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() pokemon;
  public pokemonToView: Object;

  constructor(private pokemonService: PokemonDetailService) {
    this.pokemonService.receivedPokemon$.subscribe(data => {
      this.pokemonToView = data;
    })
  }

  ngOnInit() {
  }

  showDetails(pokemon) {
    this.pokemonService.getPokemonData(pokemon);
  }

}
