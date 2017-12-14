import { Injectable } from '@angular/core';
import { PostService } from './../posts/posts.service';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SearchService {
     private posts: object[] = [];
     public resetPosts$ = new BehaviorSubject([]);

    constructor(private postService: PostService) {
        this.fetchPosts();
        console.log('here');
    }

    fetchPosts(): void {
        this.postService.getPosts().subscribe(data => {
            this.posts = [];
            for (let post in data) {
                this.posts.push(data[post]);
            }
            this.resetPosts$.next(this.posts);
        })
    }

    searchPost(input: string) {
        if (!input) {
            return of([]);
        }

        this.posts = this.resetPosts$.getValue();
        this.posts = this.posts.filter(p =>
            p['class'].toLowerCase().includes(input.toLowerCase()) ||
            p['category'].toLowerCase().includes(input.toLowerCase()));

        return of(this.posts);
    }
}