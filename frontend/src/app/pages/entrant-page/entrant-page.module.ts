import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrantPageComponent } from "./entrant-page.component";
import { BaseHeaderModule } from "../base-header/base-header.module";



@NgModule({
  declarations: [EntrantPageComponent],
  imports: [
    CommonModule,
    BaseHeaderModule
  ]
})
export class EntrantPageModule { }
