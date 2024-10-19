import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
// ConfirmationComponent to display the order confirmation details
export class ConfirmationComponent {
  // Variable to hold the user's full name
  fullName: string = '';
  // Variable to hold the total bill amount
  totalBill: number = 0;

  // Lifecycle hook that runs after the component is initialized
  ngOnInit() {
    // Retrieve and parse order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');
    // Set fullName from order details or default to 'Valued Customer'
    this.fullName = orderDetails.fullName || 'Valued Customer';
    // Set totalBill from order details or default to 0
    this.totalBill = orderDetails.totalBill || 0;

    // Clear the stored order info from localStorage to avoid displaying stale data
    localStorage.removeItem('orderDetails');
  }
}

