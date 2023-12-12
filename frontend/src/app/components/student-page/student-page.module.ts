import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentPageComponent} from "./student-page.component";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    declarations: [StudentPageComponent],
    imports: [
        CommonModule,
        FlexModule,
        FlexLayoutModule,
        ProgressSpinnerModule
    ]
})

export class StudentPageModule { }
