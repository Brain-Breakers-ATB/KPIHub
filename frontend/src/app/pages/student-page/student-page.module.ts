import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPageComponent } from "./student-page.component";
import {FlexModule} from "@angular/flex-layout";



@NgModule({
  declarations: [StudentPageComponent],
    imports: [
        CommonModule,
        FlexModule
    ]
})
export class StudentPageModule { }
