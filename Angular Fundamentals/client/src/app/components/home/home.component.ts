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
    this.postService.getPosts().subscribe(data => {
      if (data['success']) {
        data['posts'].forEach(post => {
          post['totalLikes'] = post['likes'].length;
          post['readMore'] = post['description'].slice(0, (post['description'].length / 2) / 2);
        });

        this.loading = false;
        this.posts = data['posts'].sort((a: any, b: any) => b['likes'].length - a['likes'].length).slice(0, 3);
        this.posts.length > 0 ? this.empty = false : this.empty = true;
      }
    })
  }

}
