import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './../../../services/posts/posts.service';
import { NotificationService } from './../../../services/notification/notification.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public title: string;
  public class: string;
  public category: string;
  public description: string;
  public image: string;

  constructor(
    private postService: PostService,
    private notifyService: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  createPost() {
    let payload = {
      title: this.title,
      image: this.image,
      class: this.class,
      category: this.category,
      description: this.description,
      authorId: sessionStorage.getItem('userId'),
      author: sessionStorage.getItem('username'),
      likes: []
    }

    let checkedPayload = this.validatedPost(payload);

    if (checkedPayload) {
      this.notifyService.loadingAlert('Loading..');
      this.postService.createPost(payload).subscribe(res => {
        if (res['success']) {
          this.router.navigate(['/post/forum']);
          this.notifyService.successAlert('Post created!');
        }
      })
    }
  }

  validatedPost(payload): boolean {
    if (!payload['title'] || !payload['image'] || !payload['class'] || !payload['category'] || !payload['description']) {
      this.notifyService.errorAlert('Please fill all the input fields.');
      return false;
    }

    if (payload['image'].endsWith('.jpg') || payload['image'].endsWith('.png')) {
      null
    } else {
      this.notifyService.errorAlert('Image must be in jpg or png format!');
      return false;
    }

    if (payload['title'].length < 5) {
      this.notifyService.errorAlert('Title must be at least 5 characters long!');
      return false;
    }

    if (payload['description'].length < 5 || payload['description'].length > 800) {
      this.notifyService.errorAlert('Description must be between 5 and 800 characters long!');
      return false;
    }

    return true;
  }

}
