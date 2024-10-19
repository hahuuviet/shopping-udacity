import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
// Import necessary Angular core functionalities and services
export class CartComponent implements OnInit {
  // Array to hold cart items, each item consists of a product and its quantity
  cartItems: {product: Product, quantity: number}[] = [];
  // Variable to hold the total bill amount
  totalBill: number = 0;

  // Variables to hold user's full name and phone number
  fullName: string = '';
  phoneNumber: string = '';

  // Constructor that injects the required services
  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService) {}

  // Lifecycle hook that runs after the component is initialized
  ngOnInit(): void {
    // Subscribe to the cart service to get the current cart items
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items; // Update cartItems with the received items
      this.calculateTotalBill(); // Recalculate total bill whenever cart items change
    });
  }

  // Method to restrict input to numeric values only
  restrictToNumbers(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode; // Get the character code
    // Return false if the character code is not a number
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true; // Allow the input
  }

  // Method to increase the quantity of a specific cart item
  incrementQuantity(item: {product: Product, quantity: number}): void {
    item.quantity++; // Increment the quantity
    this.modifyQuantity(item); // Update the quantity in the cart
  }

  // Method to decrease the quantity of a specific cart item
  decrementQuantity(item: {product: Product, quantity: number}): void {
    item.quantity--; // Decrement the quantity
    this.modifyQuantity(item); // Update the quantity in the cart
  }

  // Method to modify the quantity of a cart item
  modifyQuantity(item: {product: Product, quantity: number}): void {
    // Check if the quantity is less than or equal to zero
    if (item.quantity <= 0) {
      this.cartService.removeFromCart(item.product.id); // Remove item from cart
      this.toastr.warning('This item has been successfully removed from your cart.', 'Removal Successful'); // Show warning notification
    } else {
      this.cartService.updateCartItem(item); // Update the item in the cart
    }
    this.calculateTotalBill(); // Recalculate total bill after modifying quantity
  }

  // Method to calculate the total bill based on cart items
  calculateTotalBill(): void {
    this.totalBill = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity); // Sum up the prices of all items
    }, 0);
  }

  // Method to submit the order
  submitOrder() {
    // Check if fullName and phoneNumber are not empty
    if (!this.fullName || !this.phoneNumber) {
      this.toastr.error('Please ensure all fields are filled out before proceeding.', 'Submission Error'); // Show error notification if fields are empty
      return; // Exit the method
    }

    // Create an object to hold order details
    const orderDetails = {
      fullName: this.fullName, // User's full name
      totalBill: this.totalBill // Total bill amount
    };

    // Store order info in localStorage
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails)); // Save order details

    this.router.navigate(['/confirmation']); // Navigate to the confirmation page
  }
}
