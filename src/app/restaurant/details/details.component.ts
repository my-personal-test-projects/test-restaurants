import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RestaurantService } from '../restaurant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgxDatatableModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  originalData: any = [];
  rows: any = [];
  public ColumnMode = ColumnMode;
  public basicSelectedOption: number = 10;
  searchText: string = '';

  constructor(
    private router: Router,
    private restaurantService: RestaurantService
  ) {
    this.getData();
  }

  applyFilter() {
    this.searchText;
    if (this.searchText.length > 0) {
    this.rows = this.originalData.filter((f:any )=> f.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) || 
                                                    f.contact.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) || 
                                                    f.email.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())||
                                                    f.address.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()));
    } else {
      this.rows = this.originalData;
    }
  }

  getData() {
    let success = (res: any) => {
      this.rows = res;
      var jsonString = JSON.stringify(res);
      this.originalData = JSON.parse(jsonString);
    };

    let error = () => {};

    this.restaurantService.getRestaurants().subscribe(success, error);
  }

  create() {
    this.router.navigate([`restaurant/create`]);
  }

  clickOn(row: any, action: any) {
    this.router.navigate([`restaurant/edit/${row.id}/${action}`]);
  }
}
