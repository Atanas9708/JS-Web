import { Component, OnInit } from '@angular/core';
import { PostService } from './../../../services/posts/posts.service';
import { NotificationService } from './../../../services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public post: object;
  private postId = this.route.snapshot.params['id'];

  public title: string;
  public image: string;
  public class: string;
  public category: string;
  public description: string;


  constructor(
    private route: ActivatedRoute,
    private notifyService: NotificationService,
    private router: Router,
    private postService: PostService) { }

  ngOnInit() {
    this.postService.getPostById(this.postId).subscribe(data => {
      if (data['success']) {
        this.post = data['post'];
      }
    })
  }

  editPost(): void {
    let payload = {
      title: this.title || this.post['title'],
      image: this.image || this.post['image'],
      class: this.class || this.post['class'],
      category: this.category || this.post['category'],
      description: this.description || this.post['description'],
      userId: sessionStorage.getItem('userId'),
    };

    let checkedPayload = this.validatedPost(payload);

    if (checkedPayload) {
      this.postService.editPost(this.postId, payload).subscribe(res => {
        this.notifyService.loadingAlert('Loading..');
        if (res['success']) {
          this.router.navigate([`/post/details/${this.postId}`]);
          this.notifyService.successAlert('Post Edited!');
        } else {
          this.notifyService.errorAlert(res['error']['message']);
          this.router.navigate(['/home']);
        }
        
      }, err => {
        console.log(err);
        this.router.navigate(['/home']);
      })
    }
  }

  validatedPost(payload): boolean {
    if (!payload['title'] || !payload['image'] || !payload['class'] || !payload['category'] || !payload['description']) {
      this.notifyService.errorAlert('Please fill all the input fields.');
      return false;
    }

    if (payload['image'].endsWith('.jpg') || payload['image'].endsWith('.png')) {
      console.log('valid image');
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
