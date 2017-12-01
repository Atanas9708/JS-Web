import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

const url = 'http://localhost:5000';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  debouncePokemon(e) {
    return e.debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(p => this.searchPokemon(p));
  }

  searchPokemon(input) {
    return this.http.get(url + `/pokedex?pokename=${input}`);
  }
}
