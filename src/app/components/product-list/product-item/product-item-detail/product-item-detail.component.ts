import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrl: './product-item-detail.component.css',
})
// ProductItemDetailComponent to display details of a specific product and handle adding it to the cart
export class ProductItemDetailComponent {
  // Input property to receive the product data from the parent component
  @Input() product!: Product;
  // Variable to track the quantity of the product selected for addition to the cart
  selectedQuantity: number = 1;

  // Constructor to inject necessary services
  constructor(
    private route: ActivatedRoute,          // Service to access route parameters
    private productService: ProductService,  // Service to handle product-related operations
    private cartService: CartService,        // Service to handle cart operations
    private toastr: ToastrService            // Service to display notifications to the user
  ) {}

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    // Retrieve the product ID from the route parameters
    const productId = this.route.snapshot.paramMap.get('id');
    // Check if the productId exists
    if (productId) {
      // Fetch the list of products from the product service
      this.productService.getProduct().subscribe((products: Product[]) => {
        // Find the product that matches the retrieved ID
        const product = products.find((p) => p.id === +productId);
        // If a product is found, set it to the component's product property
        if (product) {
          this.product = product;
        }
      });
    } else {
      // Log an error if the product ID is null
      console.error('Product ID is null');
    }
  }

  // Method to handle adding the selected product and quantity to the cart
  addToCart(): void {
    // Call the cart service to add the product with the specified quantity
    this.cartService.addToCart(this.product, this.selectedQuantity);
    // Display a success notification to the user
    this.toastr.success('Your item has been successfully added to the cart!', 'Success!');
  }
}
