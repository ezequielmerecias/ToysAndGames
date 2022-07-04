import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product.interface';
import { ProductService } from '../product.service';


@Component({
    selector: 'product-add-dialog',
    template: `
        <form (ngSubmit)="submitEvent(form.value, form.valid)" #form="ngForm">
            <div>
                Name <input type="text" name="name" #name="ngModel" required [ngModel]="product?.name">
            </div>
            <div>
                Price <input type="text" name="price" #price="ngModel" required [ngModel]="product?.price">
            </div>
            <div>
                Company <input type="text" name="company" #company="ngModel" required [ngModel]="product?.company">
            </div>
            <div>
                Maximum Age <input type="number" name="ageRestriction" #ageRestriction="ngModel" [ngModel]="product?.ageRestriction">
            </div>
            <div>
                Description <input type="text" name="description" #description="ngModel" [ngModel]="product?.description">
            </div>
            <div>
                <button type="submit" [disabled]="form.invalid">Save</button>
                <button type="button" (click)="cancelClick()">Cancel</button>
            </div>
        </form>
    `,
  })

export class ProductAddDialog{
    product: Product;

    constructor(private productService: ProductService,
      public dialogRef: MatDialogRef<ProductAddDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Product
    ) {
        this.product = data;
    }

    submitEvent(productForm: Product, isValid: any): void{
        if(isValid){
            if(this.product.id != 0){
                productForm.id = this.product.id;
            }
            this.productService.update(productForm).subscribe();
            this.dialogRef.close(productForm);
        }
    }
  
    cancelClick(): void {
      this.dialogRef.close(null);
    }
}
