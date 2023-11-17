import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BaseFooterComponent } from "./base-footer.component";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    declarations: [BaseFooterComponent],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule
    ],
    exports: [BaseFooterComponent]
})

export class BaseFooterModule { }
