import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdivisionsPageComponent } from "./subdivisions-page.component";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
    declarations: [SubdivisionsPageComponent],
    imports: [CommonModule, FlexModule, ReactiveFormsModule, PaginatorModule]
})

export class SubdivisionsPageModule { }
