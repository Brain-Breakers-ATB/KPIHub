import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "../main-page/main-page.component";
import { EntrantPageComponent } from "../entrant-page/entrant-page.component";
import { StudentPageComponent } from "../student-page/student-page.component";
import { ContactsPageComponent } from "../contacts-page/contacts-page.component";
<<<<<<< Updated upstream:frontend/src/app/pages/base-header/base-header-routing.module.ts
import { SubdivisionsPageComponent } from "../subdivisions-page/subdivisions-page.component";
=======
import { MapPageComponent } from "../map-page/map-page.component";
import {NotfoundComponent} from "../notfound/notfound.component";
<<<<<<< Updated upstream:frontend/src/app/pages/base-header/base-header-routing.module.ts
>>>>>>> Stashed changes:frontend/src/app/components/base-header/base-header-routing.module.ts
=======
>>>>>>> Stashed changes:frontend/src/app/components/base-header/base-header-routing.module.ts

const routes: Routes = [
  { path: 'notfound', component: NotfoundComponent },
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
      loadChildren: () => import('../contacts-page/contacts-page.module').then((m) => m.ContactsPageModule),
  },
  {
    path: 'subdivisions',
    component: SubdivisionsPageComponent,
  },
<<<<<<< Updated upstream:frontend/src/app/pages/base-header/base-header-routing.module.ts
=======

    {
        path: 'map',
        component: MapPageComponent,
        loadChildren: () => import('../map-page/map-page.module').then((m) => m.MapPageModule)
    },
    { path: '**', redirectTo: '/notfound' }

<<<<<<< Updated upstream:frontend/src/app/pages/base-header/base-header-routing.module.ts
>>>>>>> Stashed changes:frontend/src/app/components/base-header/base-header-routing.module.ts
=======
>>>>>>> Stashed changes:frontend/src/app/components/base-header/base-header-routing.module.ts
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseHeaderRoutingModule { }
