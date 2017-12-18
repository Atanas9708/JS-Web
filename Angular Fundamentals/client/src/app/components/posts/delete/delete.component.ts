import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './../../../services/posts/posts.service';
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
    private notifiyService: NotificationService) { }

  ngOnInit() {
    this.postService.getPostById(this.postId).subscribe(data => {
      if (data['success']) {
        this.post = data['post'];
      }
    })
  }

  deletePost(): void {
    this.notifiyService.loadingAlert('Loading..');
    let payload = {
      userId: sessionStorage.getItem('userId'),
    }
    this.postService.deletePost(this.postId, payload).subscribe(res => {
      if (res['success']) {
        this.router.navigate(['/post/forum']);
        this.notifiyService.successAlert('Post Deleted!');
      }
    })
  }

}
