import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdivisionsPageComponent } from "./subdivisions-page.component";
import {FlexModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [SubdivisionsPageComponent],
    imports: [CommonModule, FlexModule, ReactiveFormsModule]
})

export class SubdivisionsPageModule { }
