import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


const url = 'http://localhost:3000/';

@Injectable()
export class CommentsService {

  constructor(private http: HttpClient) { }

  postComment(payload): Observable<any> {
    return this.http.post(url + 'createComment', payload, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    })
  }

  deleteComment(payload): Observable<any> {
    return this.http.post(url + 'deleteComment', payload, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    })
  }
}
