import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalService } from '../../../services/animals/animals.service';
import { NotificationService } from '../../../services/notification/notifiocation.service';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  public name: string;
  public age: number;
  public color: string;
  public type: string;
  public price: number;
  public image: string;
  public breed: string;

  constructor(private router: Router, private animalService: AnimalService, private notify: NotificationService) { };

  create(): void {
    const payload = {
      name: this.name,
      age: this.age,
      color: this.color,
      type: this.type,
      price: this.price,
      image: this.image,
      breed: this.breed
    };

    const validatedForm: object = this.validateAnimalForm(payload);
    if (validatedForm['success']) {
      this.animalService.createAnimal(payload).subscribe(res => {
        if (res['success']) {
          this.notify.successAlert('Animal created!');
          this.router.navigate(['/list']);
        } else {
          this.notify.errorAlert(res['message']);
        }
      })
    }
  }

  validateAnimalForm(payload): object {
    let isFormValid = true;
    let message = '';

    payload.age = parseInt(payload.age)
    payload.price = parseInt(payload.price)

    if (!payload || typeof payload.name !== 'string' || payload.name.length < 3) {
      isFormValid = false;
      this.notify.errorAlert('Name must be more than 3 symbols.');
    }

    if (!payload || !payload.age || payload.age < 0 || payload.age > 100) {
      isFormValid = false;
      this.notify.errorAlert('Age must be between 0 and 100.');
    }

    if (!payload || typeof payload.color !== 'string' || payload.color.length < 3) {
      isFormValid = false;
      this.notify.errorAlert('Color must be more than 3 symbols.');
    }

    if (!payload || typeof payload.type !== 'string' ||
      (payload.type !== 'Cat' && payload.type !== 'Dog' && payload.type !== 'Bunny' && payload.type !== 'Exotic' && payload.type !== 'Other')) {
      isFormValid = false;
      this.notify.errorAlert('Type must Cat, Dog, Bunny, Exotic or Other.');
    }

    if (!payload || !payload.price || payload.price < 0) {
      isFormValid = false;
      this.notify.errorAlert('Price must be a positive number.');
    }

    if (!payload || typeof payload.image !== 'string' || payload.image === 0) {
      isFormValid = false;
      this.notify.errorAlert('Image URL is required.');
    }

    if (payload && payload.breed) {
      if (typeof payload.breed !== 'string' || payload.breed.length < 3) {
        isFormValid = false;
        console.log('here');
        this.notify.errorAlert('Breed must be more than 3 symbols.');
      }
    }

    if (!isFormValid) {
      message = 'Check the form for errors.'
    }

    return {
      success: isFormValid,
      message
    }
  }
}
