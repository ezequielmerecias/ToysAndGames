import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.interface';
import { MatDialog } from '@angular/material/dialog';

import { ProductAddDialog } from './product-add.component';

@Component({
  selector: 'product-main',
  template: `
      <button mat-button (click)="newProduct()">Add New +</button>
        <table mat-table [dataSource]="products" class="mat-elevation-z8 demo-table" style="width:100%">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">{{ element.id }}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>
          <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef>Age</th>
            <td mat-cell *matCellDef="let element">
              {{ element.ageRestriction }}
            </td>
          </ng-container>
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Price</th>
            <td mat-cell *matCellDef="let element">{{ element.price }}</td>
          </ng-container>
          <ng-container matColumnDef="company">
            <th mat-header-cell *matHeaderCellDef>Company</th>
            <td mat-cell *matCellDef="let element">{{ element.company }}</td>
          </ng-container>
          <ng-container matColumnDef="options">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let element">
              <button mat-button (click)="openDialog(element)" >Update</button>
              <button mat-button (click)="deleteEvent(element.id)">Delete</button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
  `,
})
export class ProductMainComponent implements OnInit {
  products: Product[];
  // animal: string;
  // name: string;
  displayedColumns = ['id', 'name', 'age', 'price', 'company', 'options'];
  constructor(private productService: ProductService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.productService.get().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  openDialog(product : Product): void {
    const dialogRef = this.dialog.open(ProductAddDialog, {
        width: '250px',
        data: product
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result != null){
          this.products = this.products.map((product: Product)=>{
            if(product.id === result.id){
              product = Object.assign({}, product, result);
            }
            return product;
          })
        }
      });
  }

  newProduct(): void {
    const dialogRef = this.dialog.open(ProductAddDialog, {
        width: '250px',
        data: {}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result !== null){
          this.products.push(result);
        }
        return this.products;
      });
  }

  deleteEvent(id: number){
    this.productService.delete(id);
  }
}
