import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPageComponent } from "./student-page.component";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [StudentPageComponent],
    imports: [
        CommonModule,
        FlexModule,
        FlexLayoutModule
    ]
})

export class StudentPageModule { }
