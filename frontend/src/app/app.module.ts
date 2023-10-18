import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { EntrantPageComponent } from './pages/entrant-page/entrant-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { SubdivisionsPageComponent } from './pages/subdivisions-page/subdivisions-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    EntrantPageComponent,
    MainPageComponent,
    StudentPageComponent,
    SubdivisionsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
