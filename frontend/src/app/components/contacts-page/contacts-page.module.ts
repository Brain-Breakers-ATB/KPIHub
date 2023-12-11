import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsPageComponent} from "./contacts-page.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
    declarations: [ContactsPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        ProgressSpinnerModule
    ]
})

export class ContactsPageModule { }
