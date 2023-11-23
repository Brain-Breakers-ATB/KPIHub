import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrantPageComponent } from "./entrant-page.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [EntrantPageComponent],
    imports: [CommonModule, FlexLayoutModule]
})

export class EntrantPageModule { }
