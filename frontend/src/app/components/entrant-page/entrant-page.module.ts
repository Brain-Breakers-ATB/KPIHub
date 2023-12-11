import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntrantPageComponent} from "./entrant-page.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    declarations: [EntrantPageComponent],
    imports: [CommonModule, FlexLayoutModule, ProgressSpinnerModule]
})

export class EntrantPageModule { }
