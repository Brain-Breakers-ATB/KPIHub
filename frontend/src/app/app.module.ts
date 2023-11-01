import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SubdivisionsPageComponent } from './pages/subdivisions-page/subdivisions-page.component';
import { BaseHeaderModule } from "./pages/base-header/base-header.module";
import { BaseFooterModule } from "./pages/base-footer/base-footer.module";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SubdivisionsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseHeaderModule,
    BaseFooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
