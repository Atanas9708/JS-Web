import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../core/services/animals/animals.service';
import { NotificationService } from '../../../core/services/notification/notifiocation.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {

  public animals: object[];
  public notFound: boolean;

  constructor(private animalService: AnimalService,
    private router: Router,
    private notify: NotificationService) { }

  ngOnInit() {
    this.animalService.getUserAnimals().subscribe(res => {
      this.animals = res;
      if (this.animals.length === 0) {
        this.notFound = true;
      }
    })
  }

  delete(id: string): void {
    const username = sessionStorage.getItem('username');
    this.animalService.deleteAnimal(id, username).subscribe(res => {
      if (res['success']) {
        this.notify.successAlert(res['message']);
        this.router.navigate(['/list']);
      } else {
        this.notify.errorAlert(res['message']);
      }
    })
  }

}
