import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  restaurantForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private restaurantService: RestaurantService,
    private toastr: ToastrService
  ) {
    this.restaurantForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      contact: ['',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)], ],
      opentime: ['', [Validators.required]],
      closetime: ['', [Validators.required]],
      website: [''],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  backButton() {
    this.router.navigate([`restaurant`]);
  }

  create() {
    if (this.restaurantForm.invalid) {
      return;
    } else {
      var restaurant = {
        name : this.restaurantForm.get('name')?.value,
        contact : this.restaurantForm.get('contact')?.value,
        email : this.restaurantForm.get('email')?.value,
        opentime : this.restaurantForm.get('opentime')?.value,
        closetime : this.restaurantForm.get('closetime')?.value,
        website : this.restaurantForm.get('website')?.value,
        address : this.restaurantForm.get('address')?.value,
        description : this.restaurantForm.get('description')?.value,
      };
      let success = () => {
        this.toastr.success('Restaurant created successfully', 'Success');
        this.restaurantForm.reset();
        this.backButton();
      };
      let error = () => {
        this.toastr.error('Failed to create restaurant', 'Error');
      };
      this.restaurantService.addRestaurant(restaurant).subscribe(success, error);
    }
  }
}
