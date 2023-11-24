import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdivisionsPageComponent } from './subdivisions-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SubdivisionsPageComponent],
    imports: [CommonModule, FlexLayoutModule, ReactiveFormsModule, FormsModule]
})
export class SubdivisionsPageModule { }
