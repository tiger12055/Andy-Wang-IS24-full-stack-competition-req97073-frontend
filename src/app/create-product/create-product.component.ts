import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router, NavigationEnd } from '@angular/router';
import { Methodology } from '../methodology';
import { Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';

/**
Component class for creating a new product. Handles form validation and submission, as well as navigation.
*/
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  product: Product = new Product();
  methodologyOptions = Object.values(Methodology);

  constructor(private productService: ProductService, private fb: FormBuilder,
              private router: Router) {}

  productForm: FormGroup;

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
      scrumMaster: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      productOwner: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
      developerNames: this.fb.array([]),
      startDate: ['', Validators.required],
      methodology: [null, Validators.required]
    });
  }

/**

Returns the form array representing the list of developer names.
*/
  get developerNames(): FormArray {
    return this.productForm.get('developerNames') as FormArray;
  }

/**
Submits the product form data to the product service for creation. Navigates to the product list page on success.
Displays an error message in case of error.
@param productData The data to submit as the new product
*/
  saveProduct(productData: any) {
    this.productService.createProduct(productData).subscribe(
      (data) => {
        console.log(data);
        this.goToEmployeeList();
        this.productService.refreshProductList();
      },
      (error) => {
        console.log(error);
        if (error.status === 400) { // Check if the error status is 400 (Bad Request)
          alert(error.error); // Display the error message in an alert
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    );
  }

/**
Navigates to the product list page.
*/
  goToEmployeeList(){
    this.router.navigate(['/products'])

  }

/**
Submits the product form data when the form is submitted. Maps developer names to an array of developer objects.
*/
  onSubmit() {
    const productData = this.productForm.value;
    productData.developerNames = productData.developerNames.map((name: string) => ({ developerName: name }));
    console.log(productData);
    this.saveProduct(productData);
    this.router.navigate(['/products']);
  }

/**

Adds a new developer input field to the form.
*/
  addDeveloper() {
    this.developerNames.push(this.fb.control(''));
  }

/**
Removes the developer input field at the specified index from the form.
@param index The index of the developer input field to remove
*/
  removeDeveloper(index: number) {
    this.developerNames.removeAt(index);
  }

}
