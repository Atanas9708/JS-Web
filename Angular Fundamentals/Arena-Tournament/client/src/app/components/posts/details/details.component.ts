import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user/user.service';
import { PostService } from './../../../services/posts/posts.service';
import { CommentsService } from './../../../services/comments/comments.service';
import { NotificationService } from './../../../services/notification/notification.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public comments: object[] = [];
  public comment: string;
  public likes: number;
  public postToView;
  public postId: string;

  public isLogged: boolean = sessionStorage.getItem('authtoken') !== null;
  public isAdmin: boolean = sessionStorage.getItem('isAdmin') === 'true';
  public currentUserId = sessionStorage.getItem('userId');
  public isPostAuthor: boolean;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentsService: CommentsService,
    private notifiyService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.postToView = false;
      this.postId = params['id'];
      this.loadPost();
    })
  }

  loadPost() {
    this.postService.getPostById(this.postId).subscribe(data => {
      if (data['success']) {

        this.postToView = data['post'];
        data['comments'].forEach(c => {
          c['createdOn'] = this.postService.calcTime(c['createdOn']);
          c['isAuthor'] = sessionStorage.getItem('username') === c['author'];
        })
        this.comments = data['comments'];
        this.comments.forEach(c => {
          c['isAuthor'] = sessionStorage.getItem('username') === c['author'] || this.isAdmin;
        })
        this.likes = this.postToView['likes'].length;
        this.isPostAuthor = sessionStorage.getItem('username') === this.postToView['author'] || this.isAdmin;
      } else {
        this.router.navigate(['/home']);
        this.notifiyService.errorAlert(data['message']);
      }
    })
  }

  createComment(): void {
    this.userService.getCurrentUser(this.currentUserId).subscribe(res => {
      if (res['success']) {
        let payload = {
          text: this.comment,
          authorId: sessionStorage.getItem('userId'),
          author: sessionStorage.getItem('username'),
          postId: this.postId,
          createdOn: Date.now()
        };
    
        if (!payload.text || payload.text.length > 400) {
          this.notifiyService.errorAlert('Comment must be between 1 and 400 characters long!');
          return;
        } else {
          this.commentsService.postComment(payload).subscribe(data => {
            if (data['success']) {
              document.getElementById('icon_prefix2')['value'] = '';
              data['comment']['createdOn'] = this.postService.calcTime(data['comment']['createdOn']);
              data['comment']['isAuthor'] = sessionStorage.getItem('username') === data['comment']['author'];
              this.comments.unshift(data['comment']);
              this.notifiyService.successAlert('Comment created!');
            }
          })
        }
      } else {
        this.notifiyService.errorAlert('Please login to post a comment!');
      }
    })
  }

  likeDislike(): void {
    let payload = {
      postId: this.postId,
      userId: this.currentUserId
    };
    if (this.currentUserId) {
      this.postService.likeAndUnlike(payload).subscribe(data => {
        if (data['success']) {
          this.likes = data['likes'].length;
        } else {
          this.notifiyService.errorAlert('Login to like this post!');
        }
      })
    } else {
      this.notifiyService.errorAlert('Please login to like this post');
    }
  }

  deleteComment(id): void {
    let payload = {
      commentId: id,
      postId: this.postId,
      username: sessionStorage.getItem('username'),
      userId: sessionStorage.getItem('userId')
    };
    this.commentsService.deleteComment(payload).subscribe(res => {
      if (res['success']) {
        this.notifiyService.successAlert(res['message']);
        res['comments'].map(c => {
          c['isAuthor'] = sessionStorage.getItem('userId') === c['authorId'] || this.isAdmin;
          c['createdOn'] = this.postService.calcTime(c['createdOn']);
        })
        this.comments = res['comments'];
      } else {
        this.notifiyService.errorAlert(res['message']);
      }
    })
  }

}
