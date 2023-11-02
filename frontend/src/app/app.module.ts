import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BaseHeaderModule } from "./pages/base-header/base-header.module";
import {BaseFooterModule} from "./pages/base-footer/base-footer.module";

import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseHeaderModule,
    BaseFooterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
