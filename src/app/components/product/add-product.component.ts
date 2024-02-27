import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: ['', this.validateEmptyField('name')],
      stock: ['', this.validateEmptyField('stock')],
      price: ['', this.validateEmptyField('price')],
      photo: ['', this.validateEmptyField('photo')],
    });
  }

  validateEmptyField(fieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value.trim()) {
        return { [fieldName]: true };
      }
      return null;
    };
  }

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const name: string = this.f.name.value;
    const stock: number = this.f.stock.value;
    const price: number = this.f.price.value;
    const photo: string = this.f.photo.value;

    this.productService
      .addProduct({
        name,
        stock,
        price,
        photo,
      } as Product)
      .subscribe(() => this.router.navigate(['/product']));
  }

  ngOnInit(): void {}
}
