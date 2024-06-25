import { Routes } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';

export const routes: Routes = [
    {
        path: '',
        component: RestaurantComponent,
        loadChildren: () =>
          import('./restaurant/restaurant.routes').then((m) => m.restaurant_routes),
      },
];
