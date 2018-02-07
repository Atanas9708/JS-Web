import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { animalComponents } from './index';

@NgModule({
  declarations: [
    ...animalComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class AnimalModule {  };