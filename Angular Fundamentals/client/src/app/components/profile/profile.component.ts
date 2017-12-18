import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/posts/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from './../../services/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public posts: object[] = [];
  public empty: boolean;
  public loading: boolean = true;

  constructor(
    private postService: PostService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const username = sessionStorage.getItem('username');
    if (username) {
      this.postService.getUserPosts(username).subscribe(data => {
        if (data['success']) {
          data['posts'].map(p => p['totalLikes'] = p['likes'].length);
          this.posts = data['posts'];
          this.posts.length === 0 ? this.empty = true : this.empty = false;
        }
        this.loading = false;
      })
    }
  }

}
