import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { sharedComponents } from './index';

@NgModule({
    declarations: [
        ...sharedComponents,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ...sharedComponents,
    ]
})
export class SharedModule { };