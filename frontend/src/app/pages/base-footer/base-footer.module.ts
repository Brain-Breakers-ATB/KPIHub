import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BaseFooterComponent } from "./base-footer.component";


@NgModule({
    declarations: [BaseFooterComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        BaseFooterComponent
    ]
})
export class BaseFooterModule { }
