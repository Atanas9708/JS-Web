import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { authComponents } from './index';

@NgModule({
    declarations: [
        ...authComponents
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class AuthModule {  };