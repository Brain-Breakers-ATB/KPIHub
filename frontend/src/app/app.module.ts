import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { EntrantPageComponent } from './pages/entrant-page/entrant-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { SubdivisionsPageComponent } from './pages/subdivisions-page/subdivisions-page.component';
import { BaseHeaderComponent } from './pages/base-header/base-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    MainPageComponent,
    EntrantPageComponent,
    MainPageComponent,
    StudentPageComponent,
    SubdivisionsPageComponent,
    BaseHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
