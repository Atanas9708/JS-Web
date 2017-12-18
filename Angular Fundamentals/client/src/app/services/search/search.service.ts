import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

const url = 'http://localhost:3000/';

@Injectable()
export class SearchService {

    constructor(private http: HttpClient) { }

    searchPost(term: string): Observable<object> {

        if (!term.trim()) {
            return;
        }

        return this.http.get(url + `search/${term}`)
    }
}