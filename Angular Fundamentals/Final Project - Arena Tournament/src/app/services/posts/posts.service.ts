import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const url = 'https://baas.kinvey.com/';
const appKey = 'kid_BkYp9JJbf';
const appSecret = 'de648ba957bc49d0b6a53e0e1ce9311b';

@Injectable()
export class PostService {

    constructor(private http: HttpClient) { }

    getPosts(): Observable<any> {
        return this.http.get(url + `appdata/${appKey}/posts`, {
            headers: new HttpHeaders()
                .set('Authorization', 'Basic ' + btoa('Admin' + ':' + 'admin'))
        })
    }

    getPostById(postId): Observable<any> {
        return this.http.get(url + `appdata/${appKey}/posts/${postId}`, {
            headers: new HttpHeaders()
                .set('Authorization', 'Basic ' + btoa('Admin' + ':' + 'admin'))
        })
    }

    getUserPosts(user): Observable<any> {
        return this.http.get(url + `appdata/${appKey}/posts?query={"author":"${user}"}&sort={"_kmd.ect": -1}`, {
            headers: new HttpHeaders()
                .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
        })
    }

    createPost(payload): Observable<any> {
        return this.http.post(url + `appdata/${appKey}/posts`, payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
                .set('Content-Type', 'application/json')
        })
    }

    deletePost(postId): Observable<any> {
        return this.http.delete(url + `appdata/${appKey}/posts/${postId}`, {
            headers: new HttpHeaders()
                .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
        })
    }

    editPost(postId, payload): Observable<any> {
        return this.http.put(url + `appdata/${appKey}/posts/${postId}`, payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
                .set('Content-Type', 'application/json')
        })
    }

    likeAndUnlike(postId, payload): Observable<any> {
        return this.http.put(url + `appdata/${appKey}/posts/${postId}`, payload, {
            headers: new HttpHeaders()
                .set('Authorization', 'Kinvey ' + sessionStorage.getItem('authtoken'))
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