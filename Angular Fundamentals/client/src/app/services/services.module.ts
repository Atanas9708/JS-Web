import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { allServices } from './index';

@NgModule({
    providers: [
        ...allServices
    ],
    imports: [
        CommonModule
    ]
})
export class ServiceModule { };