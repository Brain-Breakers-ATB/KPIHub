import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SubdivisionsPageComponent } from './pages/subdivisions-page/subdivisions-page.component';
import { BaseHeaderModule } from "./pages/base-header/base-header.module";
import {BaseFooterModule} from "./pages/base-footer/base-footer.module";
=======
import { MainPageComponent } from './components/main-page/main-page.component';
import { BaseHeaderModule } from "./components/base-header/base-header.module";
import { BaseFooterModule } from "./components/base-footer/base-footer.module";
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotfoundComponent } from './components/notfound/notfound.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
<<<<<<< Updated upstream
    SubdivisionsPageComponent
=======
    NotfoundComponent
>>>>>>> Stashed changes
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
