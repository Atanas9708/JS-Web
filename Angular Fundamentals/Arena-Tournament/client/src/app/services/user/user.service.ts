import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const url = 'http://localhost:3000/';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getCurrentUser(userId): Observable<any> {
        return this.http.get(url + `getUser/${userId}`, {
            headers: new HttpHeaders()
                .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
                .set('Content-Type', 'application/json')
        })
    }
}