import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/posts/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts: object[] = [];
  public empty: boolean;
  public loading: boolean = true;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts => {
      for (let post in posts) {
        posts[post]['totalLikes'] = posts[post]['likes'].length;
        posts[post]['readMore'] = posts[post]['description'].slice(0, (posts[post]['description']['length'] / 2) / 2);
      }
      this.loading = false;
      this.posts = posts.sort((a: any, b: any) => b['likes']['length'] - a['likes']['length']).slice(0, 3);

      if (this.posts.length > 0) {
        this.empty = false;
      } else {
        this.empty = true;
      }
    })
  }

}
