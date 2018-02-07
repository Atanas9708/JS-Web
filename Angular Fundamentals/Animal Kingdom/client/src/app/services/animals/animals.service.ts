import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const url = 'http://localhost:5000/';

@Injectable()
export class AnimalService {

  constructor(private http: HttpClient) { };

  createAnimal(payload: object): Observable<any> {
    return this.http.post(url + 'animals/create', payload, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
        .set('Content-Type', 'application/json')
    });
  }

  getList(page: number): Observable<any> {
    return this.http.get(url + `animals/all?page=${page}`);
  }

  searchByTerm(payload): Observable<any> {
    return this.http.get(url + `animals/all?page=${payload['page']}&search=${payload['searchTerm']}`);
  }

  getAnimalById(id: string): Observable<any> {
    return this.http.get(url + `animals/details/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
    });
  }

  reactToAnimal(payload): Observable<any> {
    return this.http.post(url + `animals/details/${payload['id']}/reaction`, payload, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
        .set('Content-Type', 'application/json')
    });
  }

  postComment(payload): Observable<any> {
    return this.http.post(url + `animals/details/${payload['id']}/comments/create`, payload, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
        .set('Content-Type', 'application/json')
    })
  }

  getCommentsById(id: string): Observable<any> {
    return this.http.get(url + `animals/details/${id}/comments`, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
    })
  }

  getUserAnimals(): Observable<any> {
    return this.http.get(url + 'animals/mine', {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
    });
  }

  deleteAnimal(id: string, username: string): Observable<any> {
    return this.http.post(url + `animals/delete/${id}`, username, {
      headers: new HttpHeaders()
        .set('Authorization', 'bearer ' + sessionStorage.getItem('token'))
    });
  }

}