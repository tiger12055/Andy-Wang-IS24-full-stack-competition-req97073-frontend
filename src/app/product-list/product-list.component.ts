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

  // Subscribe to the productList$ observable to get the latest list of products           
  ngOnInit(): void {
    this.productService.productList$.subscribe((products: Product[]) => {
      this.products = products;
      this.totalProducts = products.length;
    });
    this.productService.refreshProductList();
  }

  // Navigate to the update-product page with the given productNumber
  updateProduct(productNumber: number) {
    this.router.navigate(['update-product', productNumber]);
  }

  searchText = new FormControl('');

  // Search products by Scrum Master name
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

  // Search products by Developer name
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

 // Reload the initial list of products
  reloadData() {
    this.productService.refreshProductList();
  }

  // Clear the search text for Scrum Master name
  clearScrumMasterSearch() {
    this.searchText.setValue('');
    this.searchByScrumMaster();
  }
  
  // Clear the search text for Developer name
  clearDeveloperSearch() {
    this.searchDeveloperText.setValue('');
    this.searchByDeveloperName();
  }
}