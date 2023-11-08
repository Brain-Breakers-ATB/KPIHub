import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from "./contacts-page.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
    declarations: [ContactsPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ContactsPageModule { }
