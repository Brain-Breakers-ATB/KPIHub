import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "../main-page/main-page.component";
import { EntrantPageComponent } from "../entrant-page/entrant-page.component";
import { StudentPageComponent } from "../student-page/student-page.component";
import { GalleryPageComponent } from "../gallery-page/gallery-page.component";
import { SubdivisionsPageComponent } from "../subdivisions-page/subdivisions-page.component";
import { ContactsPageComponent } from "../contacts-page/contacts-page.component";
import { MapPageComponent } from "../map-page/map-page.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'entrant',
    component: EntrantPageComponent,
    loadChildren: () => import('../entrant-page/entrant-page.module').then((m) => m.EntrantPageModule)
  },
  {
    path: 'student',
    component: StudentPageComponent,
    loadChildren: () => import('../student-page/student-page.module').then((m) => m.StudentPageModule)
  },
    {
        path: 'gallery',
        component: GalleryPageComponent,
        loadChildren: () => import('../gallery-page/gallery-page.module').then((m) => m.GalleryPageModule)
    },
    {
        path: 'subdivisions',
        component: SubdivisionsPageComponent,
        loadChildren: () => import('../subdivisions-page/subdivisions-page.module').then((m) => m.SubdivisionsPageModule)
    },
  {
    path: 'contacts',
    component: ContactsPageComponent,
      loadChildren: () => import('../contacts-page/contacts-page.module').then((m) => m.ContactsPageModule)
  },

    {
        path: 'map',
        component: MapPageComponent,
        loadChildren: () => import('../map-page/map-page.module').then((m) => m.MapPageModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BaseHeaderRoutingModule { }
