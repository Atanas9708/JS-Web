import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const baseUrl = 'https://baas.kinvey.com/';
const appKey = 'kid_BkYp9JJbf';
const appSecret = 'de648ba957bc49d0b6a53e0e1ce9311b';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    registerUser(payload): Observable<any> {
        return this.http.post(baseUrl + 'user/' + appKey, payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'Basic ' + btoa(appKey + ':' + appSecret))
                .set('Content-Type', 'application/json')
        })
    }

    loginUser(payload): Observable<any> {
        return this.http.post(baseUrl + 'user/' + appKey + '/login', payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'Basic ' + btoa(appKey + ':' + appSecret))
                .set('Content-Type', 'application/json')
        })
    }

    // testingRegister(payload): Observable<any> {
    //     return this.http.post('http://localhost:3000/register', payload, {
    //         headers: new HttpHeaders()
    //             .set('Content-Type', 'application/json')
    //     })
    // }

    // testingLogin(payload): Observable<any> {
    //     return this.http.post('http://localhost:3000/login', payload, {
    //         headers: new HttpHeaders()
    //             .set('Content-Type', 'application/json')
    //     })
    // }
}