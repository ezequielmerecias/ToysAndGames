import { Component, Inject, OnInit, ChangeDetectorRef  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, Subscriber } from 'rxjs';
import { Product } from '../models/product.interface';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute,  ParamMap } from "@angular/router";

import { convertToBase64 } from '../methods/methods';

@Component({
  selector: 'product-view-dialog',
  styleUrls: ['../../app.component.css'],
  template: `
    <mat-card>
      <mat-card-title>Product</mat-card-title>
      <form (ngSubmit)="submitEvent(form.value, form.valid)" #form="ngForm">
        <mat-form-field appearance="standard">
          <mat-label>Name</mat-label>
          <input
            matInput
            type="text"
            name="name"
            #name="ngModel"
            required
            maxlength="50"
            [ngModel]="product?.name"
          />
          <div *ngIf="name.errors?.['required']" class="error">Name is required</div>
          <div *ngIf="name.errors?.['maxlength']" class="error">Name must be maximum 50 characters long</div>
        </mat-form-field>
        <div class="form-file">
          Imagen
          <input
            type="file"
            accept="image/*"
            name="imageFileName"
            #imageFileName="ngModel"
            (ngModel)="product?.imageFileName"
            (change)="onChange(form.value, $event)"
          />
          <div *ngIf="product?.imageFileName">
            <img [src]="product.imageBase64" width="200px" height="100px">
          </div>
        </div>
        <mat-form-field appearance="standard">
          <mat-label>Price</mat-label>
          <input
            matInput
            type="text"
            name="price"
            #price="ngModel"
            required
            [ngModel]="product?.price"
          />
          <div *ngIf="price.errors?.['required']" class="error">Price is required</div>
          <div *ngIf="price.value < 1" class="error">Min number must be 1</div>
          <div *ngIf="price.value > 1000" class="error">Max number must be 1000</div>
        </mat-form-field>
        <mat-form-field appearance="standard">
          <mat-label>Company</mat-label>
          <input
            matInput
            type="text"
            name="company"
            #company="ngModel"
            required
            maxlength="50"
            [ngModel]="product?.company"
          />
          <div *ngIf="company.errors?.['required']" class="error">Company is required</div>
          <div *ngIf="company.errors?.['maxlength']" class="error">Company must be maximum 50 characters long</div>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Maximum Age</mat-label>
          <input
            matInput
            type="number"
            name="ageRestriction"
            #ageRestriction="ngModel"
            min="0"
            max="100"
            [ngModel]="product?.ageRestriction"
          />
          <div *ngIf="price.value < 0" class="error">Min number must be 0</div>
          <div *ngIf="price.value > 100" class="error">Max number must be 100</div>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <input
            matInput
            type="text"
            name="description"
            #description="ngModel"
            maxlength="100"
            [ngModel]="product?.description"
          />
          <div *ngIf="description.errors?.['maxlength']" class="error">Description must be maximum 100 characters long</div>
        </mat-form-field>
        
        <div class="action">
        <mat-divider></mat-divider>
          <button style="margin-right:20px"
            mat-raised-button
            type="submit"
            color="primary"
            [disabled]="form.invalid"
          >
            Save
          </button>
          <button mat-raised-button type="button" (click)="goBack()">
            Back
          </button>
        </div>
      </form>
    </mat-card>
  `,
})
export class ProductView implements OnInit {
  product: Product;

  constructor(private cdr: ChangeDetectorRef,
     private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
     this.route.params.subscribe(params => {
      var id = +params['id'];
      this.productService.get(id).subscribe((data: Product) => {
        this.product = data;
      });
     })
  } 

  onChange(productForm: Product, event: Event){
    const target = event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];

    this.product.imageFileName = productForm.imageFileName;
    
    convertToBase64(this.product, productForm, file);
    this.cdr.detectChanges();
  }

  submitEvent(productForm: Product, isValid: any): void {
    if (isValid) {
      if (this.product.id != 0) {
        productForm.id = this.product.id;
      }
      var newProduct: Product = productForm;
      this.productService.update(productForm).subscribe((data: Product) => {
        newProduct = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  // convertToBase64(productForm: Product, file: File){
  //   const observable = new Observable((subscriber : Subscriber<any>)=>{
  //      this.readFile(file, subscriber);
  //   })

  //   observable.subscribe((data) => {
  //     productForm.imageBase64 = data;
  //     this.product.imageBase64 = data;
  //   });
  // }

  // readFile(file: File, subscriber: Subscriber<any>){
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(file);
  //   fileReader.onload = () => {
  //     subscriber.next(fileReader.result);
  //     subscriber.complete();
  //   }

  //   fileReader.onerror = () => {
  //     subscriber.error();
  //     subscriber.complete();
  //   }
  // }
}
