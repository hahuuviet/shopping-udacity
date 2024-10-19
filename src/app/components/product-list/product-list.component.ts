import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
// ProductListComponent to manage the display of a list of products and handle adding them to the cart
export class ProductListComponent implements OnInit {
  // Array to hold the list of products fetched from the service
  products: Product[] = [];
  // Array to store the products that have been added to the cart along with their selected quantities
  cart: { product: Product; selectedQuantity: number }[] = [];

  // Constructor to inject the ProductService for fetching product data
  constructor(private productService: ProductService) {}

  // Lifecycle hook that is called after the component has been initialized
  ngOnInit(): void {
    // Fetch the list of products using the product service
    this.productService.getProduct().subscribe((data: Product[]) => {
      // Store the fetched products in the products array
      this.products = data;
    });
  }

  // Method to handle the addition of a product to the cart
  onAddToCart(event: { product: Product; selectedQuantity: number }) {
    // Push the product and its selected quantity into the cart array
    this.cart.push(event);
  }
}
