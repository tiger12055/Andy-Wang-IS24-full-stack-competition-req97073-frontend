import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Methodology } from '../methodology';
import { Validators } from '@angular/forms';

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

  get developerNames(): FormArray {
    return this.productForm.get('developerNames') as FormArray;
  }

  saveProduct(productData: any) {
    this.productService.createProduct(productData).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
    this.goToEmployeeList();
  }

  goToEmployeeList(){
    this.router.navigate(['/products'])

  }

  onSubmit() {
    const productData = this.productForm.value;
    productData.developerNames = productData.developerNames.map((name: string) => ({ developerName: name }));
    console.log(productData);
    this.saveProduct(productData);
  }

  addDeveloper() {
    this.developerNames.push(this.fb.control(''));
  }

}
