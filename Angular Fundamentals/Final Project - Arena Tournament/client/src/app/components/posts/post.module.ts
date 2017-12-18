import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { postComponents } from './index';
import { postRoutes } from './post.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(postRoutes),
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        ...postComponents
    ]
})
export class ForumModule { };