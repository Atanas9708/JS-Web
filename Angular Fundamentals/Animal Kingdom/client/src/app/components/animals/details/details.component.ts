import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../../core/services/animals/animals.service';
import { NotificationService } from '../../../core/services/notification/notifiocation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public animal: object;
  public id: string;
  public reactions: object;
  public comment: string;
  public isLogged: boolean;

  public comments: object[];

  constructor(private animalService: AnimalService,
     private activatedRoute: ActivatedRoute,
     private notify: NotificationService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.isLogged = sessionStorage.getItem('token') !== null;

      this.animalService.getAnimalById(this.id).subscribe(res => {
        this.animal = res;
        this.reactions = this.animal['reactions'];
        console.log(this.animal);

        this.loadComments();
      })
    })
  }

  react(reaction: string): void {
    let payload = {
      email: sessionStorage.getItem('username'),
      id: this.id,
      type: reaction
    }
    this.animalService.reactToAnimal(payload).subscribe(res => {
      if (res['success']) {
        this.notify.successAlert(res['message']);
        this.reactions[`${reaction}`] += 1;
      } else {
        this.notify.errorAlert(res['message']);
      }
    })
  }

  createComment(): void {
    if (this.comment === undefined || this.comment === null || this.comment.length > 10) {
      let payload = {
        id: this.id,
        user: sessionStorage.getItem('username'),
        message: this.comment
      };

      this.animalService.postComment(payload).subscribe(res => {
        if (res['success']) {
          document.getElementById('comment')['value'] = '';
          this.comment = '';
          res['comment']['createdOn'] = Date.now();
          this.comments.push(res['comment']);
          this.notify.successAlert(res['message']);
        } else {
          this.notify.errorAlert(res['message']);
        }
      })

    } else {
      this.notify.errorAlert('Comment must be more than 10 symbols.');
    }
  }

  loadComments(): void {
    this.animalService.getCommentsById(this.id).subscribe(res => {
      this.comments = res;
      console.log(this.comments);
    })
  }

}
