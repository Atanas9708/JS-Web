import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

const url = 'http://localhost:5000/';

@Injectable()
export class StatsService {
  
  constructor(private http: HttpClient) { };

  getStats(): Observable<any> {
    return this.http.get(url + 'stats');
  }
}