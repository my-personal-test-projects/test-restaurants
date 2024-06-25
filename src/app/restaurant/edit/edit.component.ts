import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestaurantService } from '../restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  restaurantForm: FormGroup;

  id: any;
  action: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private activeRoutes: ActivatedRoute,private restaurantService: RestaurantService,
    private toastr: ToastrService) {

    this.activeRoutes.params.subscribe(a => {
      this.id = a['id'],
        this.action = a['action']
    })


    this.restaurantForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)],],
      opentime: ['', [Validators.required]],
      closetime: ['', [Validators.required]],
      website: ['',],
      address: ['', [Validators.required]],
      description: ['', [Validators.required]],
      id:['']
    });

    this.getData();
    this.toggleFormControls();
  }

  getData() {
    let success =(res:any)=>{
      this.restaurantForm.patchValue({
        name: res.name,
        contact: res.contact,
        email: res.email,
        opentime: res.opentime,
        closetime: res.closetime,
        website: res.website,
        address: res.address,
        description: res.description
      })
  
    };
    let error =()=>{}
    this.restaurantService.getRestaurantById(this.id).subscribe(success,error)
  }

  backButton() {
    this.router.navigate([`restaurant`]);
  }

  update() {
    if (this.restaurantForm.invalid) {
      return;
    } else {
      var restaurant = {
        id:this.id,
        name: this.restaurantForm.get('name')?.value,
        contact: this.restaurantForm.get('contact')?.value,
        email: this.restaurantForm.get('email')?.value,
        opentime: this.restaurantForm.get('opentime')?.value,
        closetime: this.restaurantForm.get('closetime')?.value,
        website: this.restaurantForm.get('website')?.value,
        address: this.restaurantForm.get('address')?.value,
        description: this.restaurantForm.get('description')?.value,
      };
      let success = () => {
        this.toastr.success('Restaurant update successfully', 'Success');
        this.backButton();
      };
      let error = () => {
        this.toastr.error('Failed to update restaurant', 'Error');
      };
      this.restaurantService.updateRestaurant(restaurant).subscribe(success, error);
    }

  }

  delete() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.value) {
        let success=()=>{
          this.backButton();
          this.toastr.success('Restaurant delete successfully', 'Success');
        };
        let error=()=>{
          this.toastr.error('Failed to delete restaurant', 'Error');
        };
        this.restaurantService.deleteRestaurant(this.id).subscribe(success,error);
      }
    });
  }

  toggleFormControls() {
    if (this.action === 'Edit') {
      this.restaurantForm.enable();
    } else {
      this.restaurantForm.disable();
    }
  }
}
