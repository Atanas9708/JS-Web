import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:5000';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    loginUser(payload) {
        return this.http.post(url + '/login', payload);
    }
}   