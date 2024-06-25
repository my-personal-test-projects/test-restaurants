import { Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

export const restaurant_routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurant',
    pathMatch: 'full',
  },
  {
    path: 'restaurant',
    component: DetailsComponent,
  },
  {
    path: 'restaurant/create',
    component: AddComponent,
  },
  {
    path: 'restaurant/edit/:id/:action',
    component: EditComponent,
  },
];
