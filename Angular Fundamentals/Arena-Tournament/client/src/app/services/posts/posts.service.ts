import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const url = 'http://localhost:3000/';

@Injectable()
export class PostService {

    constructor(private http: HttpClient) { }


    getPosts(): Observable<any> {
        return this.http.get(url + 'allPosts')
    }

    getPostById(postId): Observable<any> {
        return this.http.get(url + `post/${postId}`);
    }


    getUserPosts(username): Observable<any> {
        return this.http.get(url + `user/${username}`, {
            headers: new HttpHeaders()
                .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
        })
    }

    createPost(payload): Observable<any> {
        return this.http.post(url + 'create', payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
                .set('Content-Type', 'application/json')
        })
    }

    deletePost(postId, payload): Observable<any> {
        return this.http.post(url + `delete/${postId}`, payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
        })
    }

    editPost(postId, payload): Observable<any> {
        return this.http.post(url + `edit/${postId}`, payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
                .set('Content-Type', 'application/json')
        })
    }

    likeAndUnlike(payload): Observable<any> {
        return this.http.post(url + `like`, payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'bearer ' + sessionStorage.getItem('authtoken'))
                .set('Content-Type', 'application/json')
        })
    }

    calcTime(input: string): string {
        let diff = +new Date - (+new Date(input));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value: any): any {
            if (value !== 1) {
                return 's';
            } else {
                return '';
            }
        }
    }
}