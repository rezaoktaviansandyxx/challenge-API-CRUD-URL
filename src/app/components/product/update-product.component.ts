import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  product!: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe(
        (res: Product) => {
          this.product = res;
          this.form = new FormGroup({
            id: new FormControl(this.product.id),
            name: new FormControl(this.product.name),
            stock: new FormControl(this.product.stock),
            price: new FormControl(this.product.price),
            photo: new FormControl(this.product.photo),
          });
        },
        (error) => console.error(error)
      );
    });
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const id: number = this.f.id.value;
    const name: string = this.f.name.value;
    const stock: number = this.f.stock.value;
    const price: number = this.f.price.value;
    const photo: string = this.f.photo.value;

    this.productService
      .updateProduct({ id, name, stock, price, photo } as Product)
      .subscribe(() => this.router.navigate(['/product']));
  }

  ngOnInit(): void {}
}
