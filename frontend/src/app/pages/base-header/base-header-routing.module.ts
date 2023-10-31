import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "../main-page/main-page.component";
import { EntrantPageComponent } from "../entrant-page/entrant-page.component";
import { StudentPageComponent } from "../student-page/student-page.component";
import { ContactsPageComponent } from "../contacts-page/contacts-page.component";
import { SubdivisionsPageComponent } from "../subdivisions-page/subdivisions-page.component";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'entrant',
    component: EntrantPageComponent,
    loadChildren: () => import('../entrant-page/entrant-page.module').then((m) => m.EntrantPageModule),
  },
  {
    path: 'student',
    component: StudentPageComponent,
    loadChildren: () => import('../student-page/student-page.module').then((m) => m.StudentPageModule),
  },
  {
    path: 'contacts',
    component: ContactsPageComponent,
  },
  {
    path: 'subdivisions',
    component: SubdivisionsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseHeaderRoutingModule { }
