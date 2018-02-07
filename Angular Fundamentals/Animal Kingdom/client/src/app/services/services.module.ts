import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { services } from './index';

@NgModule({
  providers: [
    ...services
  ],
  imports: [
    CommonModule
  ]
})
export class ServiceModule {  };