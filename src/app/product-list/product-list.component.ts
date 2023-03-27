import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  totalProducts: number;

  constructor(private productService: ProductService,
              private router:Router) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(){
    this.productService.getProductList().subscribe(data =>{
      this.products = data;
    })
  }

  updateProduct(productNumber: number) {
    this.router.navigate(['update-product', productNumber]);
  }

  searchText = new FormControl('');

  searchByScrumMaster() {
    if (this.searchText.value?.trim()) {
      this.productService
        .searchByScrumMaster(this.searchText.value.trim())
        .subscribe((data) => {
          this.products = data;
          this.totalProducts = data.length;
        });
    } else {
      this.reloadData();
    }
  }

  searchDeveloperText = new FormControl('');

  searchByDeveloperName() {
    if (this.searchDeveloperText.value?.trim()) {
      this.productService
        .searchByDeveloperName(this.searchDeveloperText.value.trim())
        .subscribe((data) => {
          this.products = data;
          this.totalProducts = data.length;
        });
    } else {
      this.reloadData();
    }
}

  reloadData() {
    this.getProducts();
  }
}