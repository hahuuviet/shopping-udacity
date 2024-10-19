import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // The BehaviorSubject is used to manage the state of the cart
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
// CartService to manage the shopping cart's state and operations
export class CartService {
  // Array to hold the items in the cart, each with a product and its quantity
  private cartItems: { product: Product; quantity: number }[] = [];
  // BehaviorSubject to allow components to subscribe and react to cart updates
  cart$ = new BehaviorSubject<{ product: Product; quantity: number }[]>([]); // The $ is a common convention to indicate that this property is an Observable

  // Method to add a product to the cart with a specified quantity
  addToCart(product: Product, quantity: number): void {
    // Check if the product is already in the cart
    const existingItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    // If it exists, increase the quantity; otherwise, add a new item
    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      this.cartItems.push({ product, quantity: Number(quantity) });
    }
    // Emit the updated cart items to all subscribers
    this.cart$.next(this.cartItems);
  }

  // Method to update the quantity of an existing cart item
  updateCartItem(updatedItem: { product: Product; quantity: number }): void {
    // Find the index of the item to be updated in the cart
    const index = this.cartItems.findIndex(item => item.product.id === updatedItem.product.id);
    // If the item is found, update it and emit the updated cart items
    if (index !== -1) {
      this.cartItems[index] = updatedItem;
      this.cart$.next(this.cartItems);
    }
  }

  // Method to remove an item from the cart by its product ID
  removeFromCart(productId: number): void {
    // Filter out the item with the specified product ID
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    // Emit the updated cart items to all subscribers
    this.cart$.next(this.cartItems);
  }

  // Method to retrieve the current state of the cart
  getCart() {
    // Return the current value of the cart items
    return this.cart$.value;
  }
}

