import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {BaseFooterComponent} from "./base-footer.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ScrollTopModule} from 'primeng/scrolltop';
import {MenuModule} from 'primeng/menu';

@NgModule({
    declarations: [BaseFooterComponent],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        ScrollTopModule,
        MenuModule
    ],
    exports: [BaseFooterComponent]
})

export class BaseFooterModule { }
