import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../services/posts/posts.service';
import { SearchService } from '../../../services/search/search.service';
import { NotificationService } from './../../../services/notification/notification.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public post: object;
  public postId = this.activatedRoute.snapshot.params['id']; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private notifiyService: NotificationService,
    private searchService: SearchService) { }

  ngOnInit() {   
    this.postService.getPostById(this.postId).subscribe(res => {
      this.post = res;
    })
  }

  deletePost(): void {
    this.notifiyService.loadingAlert('Loading..');
    this.postService.deletePost(this.postId).subscribe(res => {
      if (!res['error']) {

        let posts = this.searchService.resetPosts$.getValue();
        let postToDelete = posts.find(p => p['_id'] === res['_id']);
        posts.splice(posts.indexOf(postToDelete), 1);

        this.router.navigate(['/post/forum']);
        this.notifiyService.successAlert('Post Deleted!');
      }
    })
  }

}
