import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BaseHeaderModule } from "./components/base-header/base-header.module";
import { BaseFooterModule } from "./components/base-footer/base-footer.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpErrorInterceptor } from './interceptors/HTTPErrorInterceptor/http-error.interceptor';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SubdivisionsPageComponent} from "./components/subdivisions-page/subdivisions-page.component";
import {PaginatorModule} from "primeng/paginator";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotfoundComponent,
    SubdivisionsPageComponent
  ],
  imports: [
        BrowserModule,
        AppRoutingModule,
        BaseHeaderModule,
        BaseFooterModule,
        HttpClientModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        PaginatorModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
