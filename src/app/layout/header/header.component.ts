import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private router = inject(Router);

  public toProducts() {
    this.router.navigate(['/product']);
  }
  public toCart() {
    this.router.navigate(['/cart']);
  }
}
