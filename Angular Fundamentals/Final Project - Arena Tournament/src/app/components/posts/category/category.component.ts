import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../services/posts/posts.service';
import { NotificationService } from './../../../services/notification/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public posts: object[] = [];
  public category: string;
  public empty: boolean;
  public loading: boolean = true;
  public page: number;
  

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notifyService: NotificationService,
    private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params.hasOwnProperty('page')) {
        this.page = 1;
      } else {
        this.page = params.page;
      }
    })
  }

  loadPosts(): void {
    let currentCategory: string = this.activatedRoute.snapshot.params['bracket'];
    this.category = currentCategory;
    this.postService.getPosts().subscribe(data => {
      this.loading = false;
      this.empty = true;
      if (currentCategory !== 'all') {
        if (data['length'] > 0) {
          for (let post in data) {
            if (data[post]['category'] === currentCategory) {
              data[post]['readMore'] = data[post]['description'].slice(0, (data[post]['description']['length'] / 2) / 2);
              data[post]['totalLikes'] = data[post]['likes']['length'];
              this.posts.push(data[post]);
              this.empty = false;
            }
          }
        }
      } else {
        if (data['length'] > 0) {
          for (let post in data) {
            data[post]['totalLikes'] = data[post]['likes']['length'];
            data[post]['readMore'] = data[post]['description'].slice(0, (data[post]['description']['length'] / 2) / 2);
            this.posts.push(data[post]);
          }
          this.empty = false;
        }
      }
      this.notifyService.successAlert('Posts loaded!');
    })
  }

  pageChanged(page): void {
    this.page = page;
    this.router.navigate([`/post/category/${this.category}`], { queryParams: { page: this.page } })
  }

}
