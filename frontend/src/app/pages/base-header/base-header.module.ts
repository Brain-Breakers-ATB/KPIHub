import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseHeaderRoutingModule } from './base-header-routing.module';
import { RouterModule } from "@angular/router";
import { BaseHeaderComponent } from "./base-header.component";


@NgModule({
  declarations: [BaseHeaderComponent],
  imports: [
    CommonModule,
    BaseHeaderRoutingModule,
    RouterModule
  ],
  exports: [
    BaseHeaderComponent
  ]
})
export class BaseHeaderModule { }
