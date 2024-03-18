import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'stock',
    'price',
    'photo',
    'actions',
  ];

  constructor(private service: ProductService, private router: Router) {}

  getProducts(): void {
    this.service.getProducts().subscribe({
      next: (pro) => {
        this.products = pro;
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete'),
    });
  }

  addProduct(): void {
    this.router.navigate(['/product/add']);
  }

  updateProduct(id: number): void {
    this.router.navigate(['/product/update', id]);
  }

  deleteProduct(product: Product) {
    this.products.filter((f) => f !== product);
    this.service.deleteProduct(product).subscribe();
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
