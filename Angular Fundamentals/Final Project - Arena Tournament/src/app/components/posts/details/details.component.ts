import { Component, OnInit } from '@angular/core';
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
  public likes: string[] = [];
  public postToView;
  public postId: string;

  public isLogged: boolean = sessionStorage.getItem('authtoken') !== null;
  public isPostAuthor;

  constructor(
    private postService: PostService,
    private commentsService: CommentsService,
    private notifiyService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.postToView = false;
      this.comments = [];
      this.postId = params['id'];
      this.loadPost();
      this.loadComments();
    })
  }


  loadPost() {
    this.postService.getPostById(this.postId).subscribe(post => {
      post['postedOn'] = post['_kmd']['ect'];
      this.postToView = post;
      this.likes = this.postToView['likes'];
      //this.likesLength = this.likes.length;

      let isAdmin = sessionStorage.getItem('isAdmin');
      this.isPostAuthor = sessionStorage.getItem('username') === this.postToView['author'] || isAdmin;
    })
  }

  createComment(): void {
    let payload = {
      text: this.comment,
      author: sessionStorage.getItem('username'),
      postId: this.postId
    };

    if (!payload.text || payload.text.length > 400) {
      this.notifiyService.errorAlert('Comment must be between 1 and 400 characters long!');
      return;
    } else {
      this.notifiyService.loadingAlert('Loading..');
      this.commentsService.postComment(payload).subscribe(res => {
        if (!res['error']) {
          document.getElementById('icon_prefix2')['value'] = '';
          res['time'] = this.postService.calcTime(res['_kmd']['lmt']);
          res['isAuthor'] = sessionStorage.getItem('userId') === res['_acl']['creator'];
          this.comments.unshift(res);
          this.notifiyService.successAlert('Comment created!');
        }
      })
    }
  }

  loadComments(): void {
    this.commentsService.getCommentsByPostId(this.postId).subscribe(comments => {
      for (let comment in comments) {
        comments[comment]['time'] = this.postService.calcTime(comments[comment]['_kmd']['lmt']);
        comments[comment]['isAuthor'] = sessionStorage.getItem('userId') === comments[comment]['_acl']['creator'] || sessionStorage.getItem('isAdmin');
      }
      this.comments = comments;
    })
  }

  likeDislike(): void {
    let currentUserId = sessionStorage.getItem('userId');
    if (currentUserId) {
      let indexOfCurrentUserId = this.likes.indexOf(currentUserId);
      if (indexOfCurrentUserId === -1) {
        this.likes.push(currentUserId);
        this.notifiyService.successAlert('Post Liked!');
      } else {
        this.likes.splice(indexOfCurrentUserId, 1);
        this.notifiyService.successAlert('Post Disliked!');
      }
      let payload = {
        title: this.postToView['title'],
        image: this.postToView['image'],
        class: this.postToView['class'],
        description: this.postToView['description'],
        author: this.postToView['author'],
        category: this.postToView['category'],
        likes: this.likes
      };
      this.postService.likeAndUnlike(this.postId, payload).subscribe(res => {
        if (!res['error']) {
          this.likes = res['likes'];
          //this.likesLength = this.likes.length;
        }
      })
    } else {
      this.notifiyService.errorAlert('Please login to like this post');
    }

  }

  deleteComment(id): void {
    this.notifiyService.loadingAlert('Loading..');
    this.commentsService.getCommentById(id).subscribe(data => {
      let creator = data['_acl']['creator'];
      let currentUserId = sessionStorage.getItem('userId');
      let isAdmin = sessionStorage.getItem('isAdmin');
      if (creator === currentUserId || isAdmin) {
        let commentToDelete = this.comments.find(c => c['_id'] === id);
        let indexOfComment = this.comments.indexOf(commentToDelete);
        this.comments.splice(indexOfComment, 1);
        this.commentsService.deleteComment(id).subscribe(res => {
          if (!res['error']) {
            this.notifiyService.successAlert('Comment deleted!');
          }
        })
      }
    })
  }

}
