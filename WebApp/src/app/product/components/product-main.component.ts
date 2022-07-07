import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product.interface';
import { MatDialog } from '@angular/material/dialog';

import { ProductAddDialog } from './product-add.component';
import { ConfirmationDialog } from './confirmation.component';

@Component({
  selector: 'product-main',
  template: `
    <button mat-button (click)="newEvent()">Add New +</button>
    <table
      mat-table
      [dataSource]="products"
      class="mat-elevation-z8"
      style="width:100%"
    >
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
          <button mat-raised-button (click)="updateEvent(element)" color="primary">Update</button>
          <button mat-raised-button (click)="deleteEvent(element.id)" color="warn">Delete</button>
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
  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.get().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  updateEvent(product: Product): void {
    const dialogRef = this.dialog.open(ProductAddDialog, {
      width: '250px',
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.products = this.products.map((product: Product) => {
          if (product.id === result.id) {
            product = Object.assign({}, product, result);
          }
          return product;
        });
      }
    });
  }

  newEvent(): void {
    const dialogRef = this.dialog.open(ProductAddDialog, {
      width: '250px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null && result !== undefined) {
        this.products = [...this.products, result];
      }
    });
  }

  deleteEvent(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '250px',
      data: '¿Está seguro que desea eliminar?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(id);
        this.products = this.products.filter((result) => {
          return result.id !== id;
        });
      }
    });
  }
}
