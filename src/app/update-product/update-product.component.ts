import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { Methodology } from '../methodology';
import { Validators } from '@angular/forms';

/**
 * Component for updating a product.
 * Uses a reactive form to display and update product information.
 */
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  methodologyOptions = Object.values(Methodology);
  productForm: FormGroup;
  productNumber: number;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  /**
   * OnInit lifecycle hook.
   * Fetches the product being updated and creates the update form.
   */
  ngOnInit(): void {
  this.productNumber = +this.route.snapshot.params['productNumber'];
  this.productService.getProductById(this.productNumber).subscribe((product: Product) => {
    console.log('Received product:', product);
    this.createForm(product);
  });
}

  /**
   * Creates the form group for the update form based on a given product.
   * @param product - The product to base the form group on.
   */

createForm(product: Product): void {
  this.productForm = this.fb.group({
    productName: [product.productName, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]+')]],
    scrumMaster: [product.scrumMaster, [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
    productOwner: [product.productOwner, [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
    developerNames: this.fb.array(
      product.developerNames.map((name: string) => this.fb.control(name)),
      Validators.required
    ),
    startDate: [product.startDate, Validators.required],
    methodology: [product.methodology, Validators.required]
  });
}

  /**
   * Returns the form array for the developer names field.
   * @returns The FormArray for the developer names field.
   */
  get developerNames(): FormArray {
    return this.productForm.get('developerNames') as FormArray;
  }

  /**
   * Adds a new developer name field to the developer names FormArray.
   */
  addDeveloper() {
    this.developerNames.push(this.fb.control(''));
  }

  /**
   * Removes a developer name field from the developer names FormArray at a given index.
   * @param index - The index of the developer name field to remove.
   */

  removeDeveloper(index: number) {
    this.developerNames.removeAt(index);
  }

  /**
   * Submits the update form to update the product with new data.
   */
  onSubmit() {
    const updatedProduct: Product = {
      productNumber: this.productNumber,
      productName: this.productForm.value.productName,
      scrumMaster: this.productForm.value.scrumMaster,
      productOwner: this.productForm.value.productOwner,
      developerNames: this.productForm.value.developerNames.map((name: string) => ({ developerName: name })),
      methodology: this.productForm.value.methodology
    };
  
    this.productService.updateProduct(this.productNumber, updatedProduct).subscribe(
      (updatedProduct) => {
        console.log('Updated product:', updatedProduct);
        this.router.navigate(['/products']);
      },
      (error) => {
        if (error.status === 400) {
          alert(error.error);
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    );
  }
}