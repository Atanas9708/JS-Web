import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const url = 'https://baas.kinvey.com/';
const appKey = 'kid_BkYp9JJbf';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    getCurrentUser(userId): Observable<any> {
        return this.http.get(url + `user/${appKey}/${userId}`, {
            headers: new HttpHeaders()
                .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
        })
    }
}