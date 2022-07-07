import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product.interface';
import { ProductService } from '../product.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'product-add-dialog',
  template: `
    <mat-card>
      <mat-card-title>Product</mat-card-title>
        <form (ngSubmit)="submitEvent(form.value, form.valid)" #form="ngForm">
          <mat-form-field>
          <mat-label>Name</mat-label>
            <input
              type="text"
              name="name"
              #name="ngModel"
              required
              maxlength="50"
              [ngModel]="product?.name"
            />
            <div *ngIf="name.errors?.['required']">Name is required</div>
            <div *ngIf="name.errors?.['maxlength']">Name must be maximum 50 characters long</div>
          </mat-form-field>
          <mat-form-field>
            Price
            <input
              type="text"
              name="price"
              #price="ngModel"
              required
              [ngModel]="product?.price"
            />
            <div *ngIf="price.errors?.['required']">Price is required</div>
            <div *ngIf="price.value < 1">Min number must be 1</div>
            <div *ngIf="price.value > 1000">Max number must be 1000</div>
          </mat-form-field>
          <div mat-form-field>
            Company
            <input
              type="text"
              name="company"
              #company="ngModel"
              required
              maxlength="50"
              [ngModel]="product?.company"
            />
            <div *ngIf="company.errors?.['required']">Company is required</div>
            <div *ngIf="company.errors?.['maxlength']">Company must be maximum 50 characters long</div>
          </div>
          <div mat-form-field>
            Maximum Age
            <input
              type="number"
              name="ageRestriction"
              #ageRestriction="ngModel"
              min="0"
              max="100"
              [ngModel]="product?.ageRestriction"
            />
            <div *ngIf="price.value < 0">Min number must be 0</div>
            <div *ngIf="price.value > 100">Max number must be 100</div>
          </div>
          <div mat-form-field>
            Description
            <input
              type="text"
              name="description"
              #description="ngModel"
              maxlength="100"
              [ngModel]="product?.description"
            />
            <div *ngIf="description.errors?.['maxlength']">Description must be maximum 100 characters long</div>
          </div>
          <div>
            <button
              mat-raised-button
              type="submit"
              color="primary"
              [disabled]="form.invalid"
            >
              Save
            </button>

            <button mat-raised-button type="button" (click)="cancelEvent()">
              Cancel
            </button>
          </div>
        </form>
    </mat-card>
  `,
})
export class ProductAddDialog {
  product: Product;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.product = data;
  }

  submitEvent(productForm: Product, isValid: any): void {
    if (isValid) {
      if (this.product.id != 0) {
        productForm.id = this.product.id;
      }
      var newProduct: Product = productForm;
      this.productService.update(productForm).subscribe((data: Product) => {
        newProduct = data;
        this.dialogRef.close(newProduct);
      });
    }
  }

  cancelEvent(): void {
    this.dialogRef.close(null);
  }
}
