import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const baseUrl = 'https://baas.kinvey.com/';
const appKey = 'kid_BkYp9JJbf';
const appSecret = 'de648ba957bc49d0b6a53e0e1ce9311b';

@Injectable()
export class CommentsService {

  constructor(private http: HttpClient) { }

  getCommentsByPostId(postId): Observable<any> {
    return this.http.get(baseUrl + `appdata/${appKey}/comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa('Admin' + ':' + 'admin'))
    })
  }

  postComment(payload): Observable<any> {
    return this.http.post(baseUrl + `appdata/${appKey}/comments`, payload, {
      headers: new HttpHeaders()
        .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    })
  }

  getCommentById(commentId): Observable<any> {
    return this.http.get(baseUrl + `appdata/${appKey}/comments/${commentId}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Basic ' + btoa('Admin' + ':' + 'admin'))
    })
  }

  deleteComment(commentId): Observable<any> {
    return this.http.delete(baseUrl + `appdata/${appKey}/comments/${commentId}`, {
      headers: new HttpHeaders()
        .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
        .set('Content-Type', 'application/json')
    })
  }
}
