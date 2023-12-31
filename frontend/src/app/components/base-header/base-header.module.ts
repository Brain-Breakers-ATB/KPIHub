import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseHeaderRoutingModule} from './base-header-routing.module';
import {RouterModule} from "@angular/router";
import {BaseHeaderComponent} from "./base-header.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MenubarModule} from "primeng/menubar";

@NgModule({
    declarations: [BaseHeaderComponent],
    imports: [
        CommonModule,
        BaseHeaderRoutingModule,
        RouterModule,
        FlexLayoutModule,
        MenubarModule
    ],
    exports: [BaseHeaderComponent]
})

export class BaseHeaderModule { }
