import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
// ProductItemComponent to display a single product item with functionality to add it to the cart
export class ProductItemComponent {
  // Input property to receive the product data from the parent component
  @Input() product!: Product;
  // Output event emitter to notify the parent component when an item is added to the cart
  @Output() addToCart = new EventEmitter<{
    product: Product;              // The product being added
    selectedQuantity: number;      // The quantity of the product selected
  }>();

  // Variable to track the quantity of the product selected for addition to the cart
  selectedQuantity: number = 1;

  // Constructor to inject necessary services
  constructor(private router: Router,              // Service for navigating between routes
              private toastr: ToastrService,      // Service to display notifications to the user
              private cartService: CartService) {} // Service to handle cart operations

  // Method triggered when the product image is clicked
  onImageClick(): void {
    // Navigate to the product details page using the product's ID
    this.router.navigate(['/product', this.product.id]);
  }

  // Method to handle the addition of the selected product to the cart
  onAddToCart() {
    // Call the cart service to add the product with the specified quantity
    this.cartService.addToCart(this.product, Number(this.selectedQuantity));
    // Display a success notification to the user
    this.toastr.success('Your item has been successfully added to the cart!', 'Success!');
  }
}
