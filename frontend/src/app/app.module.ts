import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SubdivisionsPageComponent } from './pages/subdivisions-page/subdivisions-page.component';
import { BaseHeaderModule } from "./pages/base-header/base-header.module";
import { BaseFooterComponent } from './pages/base-footer/base-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    MainPageComponent,
    SubdivisionsPageComponent,
    BaseFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BaseHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
