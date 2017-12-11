import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {
    private mockMail = ['pesho@abv.bg', 'gosho@mail.bg', 'ivan@gmail.com'];

    validateMail(mail) {
        return this.mockMail.indexOf(mail) === -1 ? true : false;
    }
}