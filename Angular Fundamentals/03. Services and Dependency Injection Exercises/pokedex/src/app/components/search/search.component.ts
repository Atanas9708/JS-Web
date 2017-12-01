import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from './../../services/search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  sub$;
  public pokeData;
  targetedPokemon = new Subject<any>();
  pokemonToView = new Subject<any>();

  constructor(private searchService: SearchService) {
    this.searchService.debouncePokemon(this.targetedPokemon)
    .subscribe(data => {
      this.pokeData = data;
    })
   }

  ngOnInit() {
  }

  search(e): void {
    this.targetedPokemon.next(e.target.value);
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
