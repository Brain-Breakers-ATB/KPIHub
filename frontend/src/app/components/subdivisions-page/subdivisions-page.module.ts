import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdivisionsPageComponent } from "./subdivisions-page.component";
import { FlexModule } from "@angular/flex-layout";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from "@angular/forms";
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [SubdivisionsPageComponent],
    imports: [CommonModule, FlexModule, ReactiveFormsModule, PaginatorModule, FlexLayoutModule, FormsModule, MultiSelectModule]
})

export class SubdivisionsPageModule { }
